import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { RuleApiService } from '../../services/data/rule-api.service';
import { Store } from '@ngrx/store';
import { retrievedRuleset } from '../../stats/rule.actions';
import * as _ from 'lodash';
import { selectRule } from '../../stats/rule.selectors';
import { SysRule, SysRules } from '../../models/rule.model';
import { CommonModule, JsonPipe } from '@angular/common';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-rule-viewer',
  templateUrl: './rule-viewer.component.html',
  styleUrls: ['./rule-viewer.component.css'],
  imports: [JsonPipe, CommonModule, TreeTableModule],
})
export class RuleViewerComponent implements OnInit, OnDestroy {

  rule!: SysRules;
  rule$;
  subscriptions: any = [];
  rules: TreeNode[] = []

  cols = [
    {
      header: "name"
    },
    {
      header: "type"
    }
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: NGXLogger,
    private ruleApiService: RuleApiService,
    private store: Store
  ) {
    this.rule$ = this.store.select(selectRule);
    this.subscriptions.push(this.rule$.subscribe(async (rule) => {
      this.rule = rule

      this.rules = _.map(this.rule.rules, (rule) => {
        return {
          key: '0',
          data: {
            name: rule.name,
            type: 'Ruleset'
          },
          children: [
            {
              key: '8-0',
              data: {
                name: 'sets',
                type: 'Set'
              },
              children: _.map(rule.sets, (s) => {
                return {
                  key: '8-0',
                  data: {
                    name: s,
                    type: 'Set'
                  }
                }
              })
            },
            {
              key: '8-0',
              data: {
                name: 'asserts',
                type: 'Asserts'
              },
              children: _.map(rule.asserts, (a) => {
                return {
                  key: '8-0',
                  data: {
                    name: a,
                    type: 'Set'
                  }
                }
              })
            }
          ]
        }
      })
    }));
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.ruleApiService.findByLocation(params['location']).then((rule) => {
        this.store.dispatch(retrievedRuleset({ rule: rule }))
      })
    });
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      _.each(this.subscriptions, (subscription) => {
        subscription.unsubscribe();
      })
    }
  }

}
