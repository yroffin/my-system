import * as _ from 'lodash';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { DatabaseEntity } from './database-entity.service';
import { SysRule, SysRules } from '../models/rule.model';
import { Engine, Event, RuleProperties, Almanac, RuleResult, EngineResult } from 'json-rules-engine';
import { TreeNode } from 'primeng/api';
import { Base16Service } from './base16.service';
import * as picomatch from 'picomatch-browser';

@Injectable({
  providedIn: 'root'
})
export class RulesService extends DatabaseEntity<SysRules> {

  constructor(
    private _logger: NGXLogger,
    private _storage: LocalStorageService,
    private base16: Base16Service,
  ) {
    super()
    this.init("rules", this._storage, this._logger)
  }

  load(id: string, rules: SysRule[]): void {
    this.store({
      id,
      rules: rules
    }, (entity) => {
      entity.rules = rules
    })
  }

  ruleFactory(id: string, collector: any[]): RuleProperties[] {
    this._logger.debug("RULE/FACTORY", id)
    return _.map(this.findOne(id)?.rules, (sysrule) => {
      let rule: RuleProperties = {
        name: sysrule.name,
        priority: 1,
        conditions: sysrule.conditions,
        event: sysrule.event,
        onSuccess: (event: Event, almanac: Almanac, ruleResult: RuleResult) => {
          almanac.factValue('element').then((fact) => {
            this._logger.debug("SUCCESS", fact)
            collector.push({
              fact,
              ruleResult
            })
          })
        },
        onFailure: (event: Event, almanac: Almanac, ruleResult: RuleResult) => {
          almanac.factValue('element').then((fact) => {
            this._logger.debug("FAIL", fact)
            collector.push({
              fact,
              ruleResult
            })
          })
        }
      }
      return rule
    })
  }

  private fact(engine: Engine, fact: any): Promise<any> {
    return new Promise<any>((resolve) => {
      engine.run(fact).then(({ events }) => {
        this._logger.debug("RESOLVE", fact)
        resolve({
          fact,
          events
        })
      })
    })
  }

  execute(id: string, facts: any, fail: boolean, success: boolean): Promise<any> {
    return new Promise<any>((resolve) => {
      let engine = new Engine()
      let collector: any[] = []
      let rules = this.ruleFactory(id, collector)

      // Custom operator
      engine.addOperator('micromatch', (factValue: any, jsonValues: any) => {
        if (!_.isString(factValue)) return false
        let result = false
        // Only one match is sufficient
        _.each(jsonValues, (jsonValue) => {
          let isMatch = picomatch(jsonValue)
          this._logger.debug(`micromatch: "${factValue}" "${jsonValue}" ${isMatch(factValue)}`)
          if (isMatch(factValue)) {
            result = true
          }
        })
        return result
      })

      // Load rules
      this._logger.debug("RULE/LOAD", rules)
      _.each(rules, (rule) => {
        this._logger.debug("RULE", rule)
        engine.addRule(rule)
      })

      this._logger.debug("FACTS", facts)
      // Run the engine to evaluate
      let promises = _.map(facts, async (fact) => {
        return await this.fact(engine, fact)
      })

      // Return result
      Promise.all(promises).then((promises) => {
        _.map(promises, (engineResult) => {
          return {
            result: engineResult
          }
        })
        // Build a rule view
        let treenodes: TreeNode[] = _.map(rules, (rule) => {
          return {
            "data": {
              "id": rule.name,
              "fail": _.filter(_.map(collector, (item) => {
                return {
                  name: item.ruleResult.name,
                  result: item.ruleResult.result
                }
              }), (ruleResult) => ruleResult.name === rule.name && ruleResult.result == false),
              "success": _.filter(_.map(collector, (item) => {
                return {
                  name: item.ruleResult.name,
                  result: item.ruleResult.result
                }
              }), (ruleResult) => ruleResult.name === rule.name && ruleResult.result == true)
            },
            "children": _.filter(_.map(collector, (item) => {
              return {
                "data": {
                  "uid": this.base16.encode(item.fact.data.id),
                  "id": item.fact.data.id,
                  "label": item.fact.data.label,
                  "tag": item.fact.data.tag,
                  "rule": item.ruleResult.name,
                  "valid": item.ruleResult.result,
                },
                "children": []
              }
            }), (ruleResult) => ruleResult.data.rule === rule.name && (ruleResult.data.valid === fail || ruleResult.data.valid === success))
          }
        })
        resolve({
          success: _.filter(collector, (item) => item.ruleResult.result),
          failure: _.filter(collector, (item) => !item.ruleResult.result),
          treenodes
        })
      })
    })
  }
}
