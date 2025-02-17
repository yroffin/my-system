import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as _ from 'lodash';
import { NGXLogger } from 'ngx-logger';
import { MessageService } from 'primeng/api';
import { SysRule, SysRules } from '../../models/rule.model';

@Injectable({
  providedIn: 'root'
})
export class RuleApiService {
  constructor(private logger: NGXLogger, private api: ApiService, private messageService: MessageService) { }

  /**
   * find all graph
   * @returns 
   */
  findAllLazy(): Promise<SysRules[]> {
    return new Promise<SysRules[]>(async (resolve, reject) => {
      let entities = await this.api.findAll('sysRuleEntities');
      let map = _.map(entities._embedded.sysRuleEntities, async (entity) => {
        return <SysRules>{
          id: this.api.extractId(entity._links.self.href),
          label: entity.label,
          location: entity.location,
          rules: [],
        }
      })
      let result = Promise.all(map);
      resolve(result);
    })
  }

  /**
   * find one graph
   * @param id 
   * @returns 
   */
  findOne(id: string): Promise<SysRules> {
    return new Promise<SysRules>(async (resolve, reject) => {
      let entity = await this.api.findOne(id, 'sysRuleEntities');
      let rules = _.map(await this.api.links(entity._links.tags.href, 'sysRulesetEntities'), (entity) => {
        return <SysRule>{
          name: entity.name,
          sets: JSON.parse(entity.sets),
          asserts: JSON.parse(entity.asserts)
        }
      });
      resolve({
        id,
        label: entity.label,
        location: entity.location,
        rules
      });
    })
  }

  /**
 * find one graph
 * @param id 
 * @returns 
 */
  findByLocation(location: string): Promise<SysRules> {
    return new Promise<SysRules>(async (resolve, reject) => {
      let entity = (await this.api.findByLocation(location, 'sysRuleEntities'))._embedded.sysRuleEntities[0];
      resolve({
        id: this.api.extractId(entity._links.self.href),
        label: entity.label,
        location: entity.location,
        rules: []
      });
    })
  }

  async jsondataEngine(id: string, facts: any, fail: boolean, success: boolean): Promise<any> {

    let rules = (await this.findOne(id))?.rules
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
      _.each(rulesets, (rule) => {
        let sets: any[] = []
        // Capture all elements
        _.each(rule.sets, (ruleset) => {
          /**
           * TODO
           * let query = jsonata(ruleset).evaluate(facts)
           */
          let query = { length: 0 }
          if (!query.length) {
            query = [query]
          }
          this.logger.info(query)
          _.each(query, (elements) => {
            sets.push(elements)
          })
        })
        // Parse all assert
        _.each(sets, (elements) => {
          let cumul = false
          _.each(rule.asserts, (assert) => {
            /**
             * TODO
             * let result = jsonata(assert).evaluate(elements)
             */
            let result = {}
            if (result) cumul = true
          })
          collector.push({
            fact: elements,
            ruleResult: {
              name: rule.name,
              result: cumul
            }
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
                    "uid": /* TODO this.base16.encode(item.fact.data.id) */"00000000",
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
