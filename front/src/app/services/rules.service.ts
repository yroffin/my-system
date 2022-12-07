import * as _ from 'lodash';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { DatabaseEntity } from './database-entity.service';
import { SysRule, SysRules } from '../models/rule.model';
import { Base16Service } from './base16.service';
import * as jsonata from 'jsonata';

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

  jsondataEngine(id: string, facts: any, fail: boolean, success: boolean): Promise<any> {

    let rules = this.findOne(id)?.rules
    if (rules) {
      let rulesets: SysRule[] = []
      _.each(rules, (rule) => {
        rulesets.push({
          "name": rule.name,
          "sets": rule.sets,
          "asserts": rule.asserts
        })
      })

      let collector: any[] = []
      _.each(rules, (rule) => {
        let sets: any[] = []
        // Capture all elements
        _.each(rule.sets, (set) => {
          _.each(jsonata(set).evaluate(facts), (elements) => {
            sets.push(elements)
          })
        })
        // Parse all assert
        _.each(rule.asserts, (assert) => {
          _.each(sets, (element) => {
            _.each(rule.asserts, (assert) => {
              let result = jsonata(assert).evaluate(element)
              collector.push({
                fact: element,
                ruleResult: {
                  name: rule.name,
                  result
                }
              })
            })
          })
        })
      })

      // Build a rule view
      return new Promise<any>((resolve) => {
        resolve({
          success: _.filter(collector, (item) => item.ruleResult.result),
          failure: _.filter(collector, (item) => !item.ruleResult.result),
          treenodes: _.map(rulesets, (rule: SysRule) => {
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
                    "alias": item.fact.data.alias,
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
        })
      })
    } else {
      return new Promise<any>((resolve) => {
        resolve({
          success: [],
          failure: [],
          treenodes: []
        })
      })
    }
  }
}
