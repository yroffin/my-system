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
  rules: TreeNode[] = [
    {
      key: '0',
      data: {
        name: 'Applications',
        size: '100kb',
        type: 'Folder'
      },
      children: [
        {
          key: '0-0',
          data: {
            name: 'React',
            size: '25kb',
            type: 'Folder'
          },
          children: [
            {
              key: '0-0-0',
              data: {
                name: 'react.app',
                size: '10kb',
                type: 'Application'
              }
            },
            {
              key: '0-0-1',
              data: {
                name: 'native.app',
                size: '10kb',
                type: 'Application'
              }
            },
            {
              key: '0-0-2',
              data: {
                name: 'mobile.app',
                size: '5kb',
                type: 'Application'
              }
            }
          ]
        },
        {
          key: '0-1',
          data: {
            name: 'editor.app',
            size: '25kb',
            type: 'Application'
          }
        },
        {
          key: '0-2',
          data: {
            name: 'settings.app',
            size: '50kb',
            type: 'Application'
          }
        }
      ]
    },
    {
      key: '1',
      data: {
        name: 'Cloud',
        size: '20kb',
        type: 'Folder'
      },
      children: [
        {
          key: '1-0',
          data: {
            name: 'backup-1.zip',
            size: '10kb',
            type: 'Zip'
          }
        },
        {
          key: '1-1',
          data: {
            name: 'backup-2.zip',
            size: '10kb',
            type: 'Zip'
          }
        }
      ]
    },
    {
      key: '2',
      data: {
        name: 'Desktop',
        size: '150kb',
        type: 'Folder'
      },
      children: [
        {
          key: '2-0',
          data: {
            name: 'note-meeting.txt',
            size: '50kb',
            type: 'Text'
          }
        },
        {
          key: '2-1',
          data: {
            name: 'note-todo.txt',
            size: '100kb',
            type: 'Text'
          }
        }
      ]
    },
    {
      key: '3',
      data: {
        name: 'Documents',
        size: '75kb',
        type: 'Folder'
      },
      children: [
        {
          key: '3-0',
          data: {
            name: 'Work',
            size: '55kb',
            type: 'Folder'
          },
          children: [
            {
              key: '3-0-0',
              data: {
                name: 'Expenses.doc',
                size: '30kb',
                type: 'Document'
              }
            },
            {
              key: '3-0-1',
              data: {
                name: 'Resume.doc',
                size: '25kb',
                type: 'Resume'
              }
            }
          ]
        },
        {
          key: '3-1',
          data: {
            name: 'Home',
            size: '20kb',
            type: 'Folder'
          },
          children: [
            {
              key: '3-1-0',
              data: {
                name: 'Invoices',
                size: '20kb',
                type: 'Text'
              }
            }
          ]
        }
      ]
    },
    {
      key: '4',
      data: {
        name: 'Downloads',
        size: '25kb',
        type: 'Folder'
      },
      children: [
        {
          key: '4-0',
          data: {
            name: 'Spanish',
            size: '10kb',
            type: 'Folder'
          },
          children: [
            {
              key: '4-0-0',
              data: {
                name: 'tutorial-a1.txt',
                size: '5kb',
                type: 'Text'
              }
            },
            {
              key: '4-0-1',
              data: {
                name: 'tutorial-a2.txt',
                size: '5kb',
                type: 'Text'
              }
            }
          ]
        },
        {
          key: '4-1',
          data: {
            name: 'Travel',
            size: '15kb',
            type: 'Text'
          },
          children: [
            {
              key: '4-1-0',
              data: {
                name: 'Hotel.pdf',
                size: '10kb',
                type: 'PDF'
              }
            },
            {
              key: '4-1-1',
              data: {
                name: 'Flight.pdf',
                size: '5kb',
                type: 'PDF'
              }
            }
          ]
        }
      ]
    },
    {
      key: '5',
      data: {
        name: 'Main',
        size: '50kb',
        type: 'Folder'
      },
      children: [
        {
          key: '5-0',
          data: {
            name: 'bin',
            size: '50kb',
            type: 'Link'
          }
        },
        {
          key: '5-1',
          data: {
            name: 'etc',
            size: '100kb',
            type: 'Link'
          }
        },
        {
          key: '5-2',
          data: {
            name: 'var',
            size: '100kb',
            type: 'Link'
          }
        }
      ]
    },
    {
      key: '6',
      data: {
        name: 'Other',
        size: '5kb',
        type: 'Folder'
      },
      children: [
        {
          key: '6-0',
          data: {
            name: 'todo.txt',
            size: '3kb',
            type: 'Text'
          }
        },
        {
          key: '6-1',
          data: {
            name: 'logo.png',
            size: '2kb',
            type: 'Picture'
          }
        }
      ]
    },
    {
      key: '7',
      data: {
        name: 'Pictures',
        size: '150kb',
        type: 'Folder'
      },
      children: [
        {
          key: '7-0',
          data: {
            name: 'barcelona.jpg',
            size: '90kb',
            type: 'Picture'
          }
        },
        {
          key: '7-1',
          data: {
            name: 'primeng.png',
            size: '30kb',
            type: 'Picture'
          }
        },
        {
          key: '7-2',
          data: {
            name: 'prime.jpg',
            size: '30kb',
            type: 'Picture'
          }
        }
      ]
    },
    {
      key: '8',
      data: {
        name: 'Videos',
        size: '1500kb',
        type: 'Folder'
      },
      children: [
        {
          key: '8-0',
          data: {
            name: 'primefaces.mkv',
            size: '1000kb',
            type: 'Video'
          }
        },
        {
          key: '8-1',
          data: {
            name: 'intro.avi',
            size: '500kb',
            type: 'Video'
          }
        }
      ]
    }
  ];

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
