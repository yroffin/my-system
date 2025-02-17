import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { retrievedGraph } from '../../stats/graph.actions';
import { selectGraph, selectGraphs } from '../../stats/graph.selectors';
import { v4 as uuidv4 } from 'uuid';

import cy from 'cytoscape';
import {
  Core,
  CytoscapeOptions,
  EdgeDefinition,
  ElementsDefinition,
  LayoutOptions,
  NodeDefinition,
  Position,
  SelectionType,
  Stylesheet
} from 'cytoscape'
import edgehandles from 'cytoscape-edgehandles';
import automove from 'cytoscape-automove';
import snapToGrid from 'cytoscape-snap-to-grid';

cy.use(edgehandles);
cy.use(automove);
cy.use(snapToGrid);

import { BreadthFirstLayoutOptionsImpl, CircleLayoutOptionsImpl, ConcentricLayoutOptionsImpl, CoseLayoutOptionsImpl, DagreLayoutOptionsImpl, GridLayoutOptionsImpl } from './layout-options-impl';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from '../../services/clipboard.service';
import { SysEdge, SysGraph, SysNode } from '../../models/graph';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { Base16Service } from '../../services/base16.service';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { TreeTable } from 'primeng/treetable';
import { SysPreference } from '../../models/preference';
import { SysStyles } from '../../models/style';
import { retrievedStyle } from '../../stats/style.actions';
import { PreferenceService } from '../../services/preferences.service';
import { selectMenu, selectParameter } from '../../stats/menu.selectors';
import { menuIds } from '../../models/menu';
import { selectMenuIds, setDrawMode, setGroupMode, setZoom } from '../../stats/menu.actions';
import { GraphApiService } from '../../services/data/graph-api.service';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { TabViewModule } from 'primeng/tabview'
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitterModule } from 'primeng/splitter';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown'
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { DockModule } from 'primeng/dock';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CommonModule } from '@angular/common';
import { MarkdownService } from '../../services/markdown.service';
import { HashService } from '../../services/hash.service';
import { StyleApiService } from '../../services/data/style-api.service';
import { RuleApiService } from '../../services/data/rule-api.service';

declare var cytoscape: any

class link {
  public action!: string;
  public label!: string;
  public target!: string;
}

@Component({
  selector: 'app-graph-cytoscape',
  templateUrl: './graph-cytoscape.component.html',
  styleUrls: ['./graph-cytoscape.component.css'],
  imports: [CommonModule, ContextMenuModule, DockModule, BadgeModule, OverlayBadgeModule, TooltipModule,
    CheckboxModule, DropdownModule, FormsModule, TextareaModule, TableModule, PanelModule, ToastModule, DialogModule,
    TreeTableModule, TreeModule, TabViewModule, ChartModule, ButtonModule, ToggleButtonModule, SplitterModule]
})
export class GraphCytoscapeComponent implements OnInit, AfterViewInit, OnDestroy {

  displaySelectionNode: boolean = false;
  displaySelectionEdge: boolean = false;
  displaySummary: boolean = false;
  displayChangeProperties: boolean = false;
  onIcon = "pi pi-check"

  displayFinder: boolean = false;
  displayMarkdown: boolean = false;
  displaySidebar: boolean = false;

  @ViewChild('myCytoscape') myGraph?: ElementRef;
  @ViewChild('myPng') myPng?: ElementRef;
  @ViewChild('myTreeTable') myTreeTable?: TreeTable;
  subscriptions: any = [];

  preferences!: SysPreference

  cy?: Core
  boxSelectionEnabled?: boolean
  displayExportPng = false
  displayTool = true

  searchNode = ""
  graphs: TreeNode[] = [];
  jsonRules: TreeNode[] = [];
  alias: TreeNode[] = [];
  allNodes: any[] = [];
  rowGroupMetadata: any;

  tagsSummary: string[] = []
  markdownSummary: any[][] = []

  cols: any[] = [
    { field: 'label', header: 'Label' }
  ];

  breadFirstLayoutOptions?: LayoutOptions = new BreadthFirstLayoutOptionsImpl()
  concentricLayoutOptions?: LayoutOptions = new ConcentricLayoutOptionsImpl()
  circleLayoutOptions?: LayoutOptions = new CircleLayoutOptionsImpl()
  gridLayoutOptions?: LayoutOptions = {
    name: 'grid',

    // extra spacing around nodes when avoidOverlap: true
    avoidOverlapPadding: 50,
    // uses all available space on false, uses minimal space on true
    condense: true,
    // force num of rows in the grid
    rows: 20,
    // force num of columns in the grid
    cols: 5
  }
  coseLayoutOptions?: LayoutOptions = new CoseLayoutOptionsImpl()

  id?: string
  activeQueryParams!: any
  activeRoute!: string
  firstLoad: boolean = false

  currentStyle!: string
  currentStyleCounter: number = 0
  items: MenuItem[] = [];

  currentRules!: string
  currentRulesCounter: number = 0
  currentRulesFail: number = 0
  currentRulesSuccess: number = 0

  selectorDisplay: string = "";
  selectorTagDisplay: string = "";
  selectorLabelDisplay: string = "";
  edgehandles: any;
  rules: any = [];

  preventDispatchZoom = true;

  graph$;
  graphs$;
  menu$;
  parameter$;

  _lockedElement: boolean = false;

  constructor(
    private markdownService: MarkdownService,
    private hashService: HashService,
    private graphsServiceApi: GraphApiService,
    private styleApiService: StyleApiService,
    private ruleApiService: RuleApiService,
    private preferenceService: PreferenceService,
    private clipboardService: ClipboardService,
    private router: Router,
    private logger: NGXLogger,
    private messageService: MessageService,
    private base16: Base16Service,
    private store: Store, private route: ActivatedRoute) {
    this.graph$ = this.store.select(selectGraph);
    this.graphs$ = this.store.select(selectGraphs);
    this.menu$ = this.store.select(selectMenu);
    this.parameter$ = this.store.select(selectParameter);

    let preferences = this.preferenceService.findOne("default")
    if (preferences) {
      this.preferences = preferences
      this.preferenceService.apply()
    }

    this.subscriptions.push(this.parameter$.subscribe(message => {
      {
        this.logger.info(`Parameter`, message)
        if (message.groupMode) {
          _.each(this.rules, (rule) => {
            rule.enable()
          })
        } else {
          _.each(this.rules, (rule) => {
            rule.disable()
          })
        }

        if (this.edgehandles) {
          if (message.drawMode) {
            this.edgehandles.enableDrawMode()
          } else {
            this.edgehandles.disableDrawMode()
          }
        }

        if (message.zoom) {
          this.preventDispatchZoom = true
          this.cy?.zoom(message.zoom)
          this.preventDispatchZoom = false
        }

        this.onClearAnySelection()
      }
    })
    )

    this.subscriptions.push(this.menu$.subscribe(message => {
      switch (message.id) {
        case menuIds.graph_apply_rules:
          {
            this.applyRuleset(true, false)
          }
          break;
        case menuIds.graph_change_properties:
          {
            this.changeProperties()
          }
          break;
        case menuIds.graph_add_new_node:
          {
            this.createNewNode()
          }
          break;
        case menuIds.statistics_groups:
          {
            // Build all group
            let allGroups = _.sortBy(_.filter(_.map(this.cy?.nodes(), (node) => {
              return node.data().group
            }), (node) => node && node !== ""));

            // Group by them
            let groupBy: any = {}
            _.each(allGroups, (group) => {
              if (groupBy[group]) {
                groupBy[group] += 1
              } else {
                groupBy[group] = 1
              }
            })

            // Build statistic
            this.dataGroupStatistics = {
              datasets: [{
                data: _.map(groupBy, (k, v) => k),
                backgroundColor: _.map(groupBy, (k, v) => {
                  switch (k) {
                    case 1: return "#42A5F5";
                    case 2: return "#66BB6A";
                    case 3: return "#FFA726";
                    case 4: return "#26C6DA";
                    default: return "#7E57C2";
                  }
                }),
                label: 'My dataset'
              }],
              labels: _.map(groupBy, (k, v) => v)
            }

            this.displayGroupStatistic = true
          }
          break;
        case menuIds.statistics_tags:
          {
            // Build all group
            let allTags = _.sortBy(_.filter(_.map(this.cy?.nodes(), (node) => {
              return node.data().tag
            }), (node) => node && node !== "" && node.alias === undefined));

            // Group by them
            let groupBy: any = {}
            _.each(allTags, (group) => {
              if (groupBy[group]) {
                groupBy[group] += 1
              } else {
                groupBy[group] = 1
              }
            })

            // Build statistic
            this.dataTagStatistics = {
              datasets: [{
                data: _.map(groupBy, (k, v) => k),
                backgroundColor: _.map(groupBy, (k, v) => {
                  switch (k) {
                    case 1: return "#42A5F5";
                    case 2: return "#66BB6A";
                    case 3: return "#FFA726";
                    case 4: return "#26C6DA";
                    default: return "#7E57C2";
                  }
                }),
                label: 'My dataset'
              }],
              labels: _.map(groupBy, (k, v) => v)
            }

            this.displayTagStatistic = true
          }
          break;

        case menuIds.statistics_summary:
          {
            // Build all tags
            let tags = _.map<cy.NodeSingular, string>(this.cy?.nodes(), (node) => {
              let result: string = node.data().tag;
              return result
            })
            this.tagsSummary = _.uniq(tags)

            let facts = this.buildFacts()
            let CSV = "Tag;Id;Label;isAlias;Alias;Type;Label;Target\n"

            // build all nodes
            let allNodes = _.map(this.cy?.nodes(), (node) => {
              return {
                id: this.base16.decode(node.data().id),
                key: node.data().id,
                label: node.data().label,
                tag: node.data().tag,
                alias: node.data().alias !== undefined,
                rawAlias: node.data().alias !== undefined ? node.data().alias : this.base16.decode(node.data().id)
              }
            })

            this.markdownSummary = []
            _.each(this.tagsSummary, (tag) => {
              let markdown: any[] = []

              // build all edges with target (node) with tag
              let edges = _.sortBy(_.map(_.filter(facts, (fact) => {
                return fact.element.type === 'edges'
                  && (fact.element.data.source?.tag === tag || fact.element.data.target?.tag === tag)
              }), (edge) => {
                return {
                  id: edge.element.data.source?.tag === tag ? edge.element.data.source.id : edge.element.data.target.id,
                  label: edge.element.data.label,
                  source: edge.element.data.source.id,
                  target: edge.element.data.target.id
                }
              }), (edge) => {
                return edge.id
              })

              let nodes = _.sortBy(_.filter(allNodes, (node) => true), (node) => node.rawAlias)

              _.each(_.filter(nodes, (node) => node.tag === tag), (node) => {
                let local = {
                  id: `${node.id}`,
                  key: `${node.key}`,
                  label: `${node.label}`,
                  isAlias: node.alias,
                  alias: node.alias ? `${node.rawAlias}` : `${node.id}`,
                  rawAlias: node.alias ? `[ALIAS FOR] ${node.rawAlias}` : ``,
                  links: <link[]>[]
                }
                markdown.push(local)
                _.each(_.filter(edges, (edge) => edge.id === node.id), (edge) => {
                  if (node.id === edge.source) {
                    local.links.push({
                      action: `IN`,
                      label: `${edge.label}`,
                      target: `${edge.target}`
                    })
                    CSV += `${tag};${local.id};${local.label};${local.isAlias};${local.alias};IN;${edge.label};${edge.target}\n`
                  } else {
                    local.links.push({
                      action: `OUT`,
                      label: `${edge.label}`,
                      target: `${edge.source}`
                    })
                    CSV += `${tag};${local.id};${local.label};${local.isAlias};${local.alias};OUT;${edge.label};${edge.source}\n`
                  }
                })
              })

              this.markdownSummary.push(markdown)
            })

            this.messageService.add({
              key: 'popup', severity: 'info', summary: 'Info', detail: `Store CSV in clipboard`
            });
            this.clipboardService.copyTextToClipboard(CSV)

            this.displaySummary = true
          }
          break;

        case menuIds.graph_layout_bread_first:
          {
            if (this.breadFirstLayoutOptions) {
              this.cy?.layout(this.breadFirstLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
          break;
        case menuIds.graph_layout_concentric:
          {
            if (this.concentricLayoutOptions) {
              this.cy?.layout(this.concentricLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
          break;
        case menuIds.graph_layout_circle:
          {
            if (this.circleLayoutOptions) {
              this.cy?.layout(this.circleLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
          break;
        case menuIds.graph_layout_grid:
          {
            if (this.gridLayoutOptions) {
              this.cy?.layout(this.gridLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
          break;
        case menuIds.graph_layout_cose:
          {
            if (this.coseLayoutOptions) {
              this.cy?.layout(this.coseLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
          break;
      }
    })
    )

    this.subscriptions.push(this.graph$.subscribe(async (graph) => {
      if (!graph || graph.id === "") {
        return
      }
      // refresh render
      this.firstLoad = false
      this.cy?.startBatch()
      this.cy?.boxSelectionEnabled(this.boxSelectionEnabled)
      this.cy?.nodes().remove()
      this.cy?.edges().remove()
      console.log(graph)

      // Apply style and rules
      await this.applyChangeProperties(graph.style, graph.rules)

      this.graphs = []

      if (graph.nodes) {
        this.graphs.push(this.buildChildNodes(graph))

        // Capture all node id (for alias)
        this.allNodes = _.map(graph.nodes, (node) => {
          return {
            label: node.location,
            value: node.location
          }
        })
        this.allNodes.unshift({
          label: '',
          value: ''
        });

        this.cy?.add(_.map(graph.nodes, (node) => {
          let _node: any = {
            data: {
              id: this.base16.encode(node.location),
              label: node.label,
              cdata: node.cdata,
              alias: node.alias,
              group: node.group,
              tag: node.tag
            },
            position: {
              x: node.x,
              y: node.y
            }
          }
          // Decode parent property
          if (node.parent) {
            _node.data.parent = node.parent
          }
          return _node
        }))
      }


      if (graph.edges) {
        this.graphs.push(this.buildChildEdges(graph))

        let dict: any = {}
        this.cy?.add(_.map(graph.edges, (edge) => {
          let _edge = {
            data: {
              id: this.base16.encode(this.hashService.buildId(dict, {
                source: edge.source,
                target: edge.target
              })),
              label: edge.label,
              cdata: edge.cdata,
              source: this.base16.encode(edge.source) || "",
              target: this.base16.encode(edge.target) || "",
              _source: edge.source || "",
              _target: edge.target || "",
              tag: edge.tag
            }
          }
          return _edge
        }))
      }

      if (this.cy) {
        if (this.edgehandles) {
          this.edgehandles.destroy()
        }

        _.each(this.rules, (rule) => {
          rule.destroy()
        })

        this.rules = []
        let allGroups = _.uniq(_.map(_.filter(graph.nodes, (node) => { return node.group !== "" }), (node) => {
          return node.group
        }))

        let myCy: any = this.cy
        this.edgehandles = myCy.edgehandles()

        _.each(allGroups, (group) => {
          let selectedGroup = this.cy?.$(`[group = "${group}"]`)
          this.rules.push(myCy.automove({
            nodesMatching: selectedGroup,
            reposition: 'drag',
            dragWith: selectedGroup,
          }))
        })
      }
      this.cy?.endBatch()
      this.cy?.fit()

      // Decode query params
      this.route.queryParams.subscribe(activeQueryParams => {
        this.activeQueryParams = activeQueryParams
        if (this.activeQueryParams.zoom) {
          let zoom = Number(this.activeQueryParams.zoom)
          this.cy?.zoom(zoom)
        }
        if (this.activeQueryParams['nodeId']) {
          // Select node
          this.selectGraphItem({
            nodeId: this.activeQueryParams['nodeId']
          }, this.coreItem, false)
        }
        if (this.activeQueryParams['edgeId']) {
          // Select edge
          this.selectGraphItem({
            nodeId: this.activeQueryParams['edgeId']
          }, this.coreItem, false)
        }
      })

      // Apply ruleset on each update
      if (this.preferences.applyRules) {
        setTimeout(() => {
          // apply ruleset
          this.applyRuleset(false, true)
        }, 1)
      }
    }))
  }

  ngOnInit(): void {
    this.items = this.coreItem;
  }

  async ngAfterViewInit(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.cy = cy({
      container: this.myGraph?.nativeElement,
      layout: { name: 'preset' },
      motionBlur: true,
      selectionType: 'single',
      boxSelectionEnabled: false
    });

    if (this.preferences.grid) {
      let myCy: any = this.cy
      myCy?.snapToGrid()
    }

    this.cy.on('mouseover', (event) => {
      this.logger.debug(event)
    });

    this.cy.on('mouseout', (event) => {
      this.logger.debug(event)
    });

    this.cy.on('zoom', (event) => {
      let zoom = this.cy?.zoom()

      // zoom event can be thrown with zoom internal update
      if (zoom && !this.preventDispatchZoom) {
        this.store.dispatch(setZoom({
          message: zoom
        }))
      }

      this.activeQueryParams = {
        nodeId: this.activeQueryParams.nodeId,
        edgeId: this.activeQueryParams.edgeId,
        zoom: zoom
      }
      // Apply new query params
      this.router.navigate([this.activeRoute], {
        queryParams: this.activeQueryParams
      });
    });

    this.cy.on('dblclick', 'node', (event) => {
      this.onDblClickNode(event, event.target.id(), this.nodeItem)
    });

    this.cy.on('dblclick', 'edge', (event) => {
      this.onDblClickEdge(event, event.target.id(), this.edgeItem)
    });

    this.cy.on('cxttap', 'node', (event) => {
      this.onRightClickNode(event, event.target.id(), this.nodeItem)
    });

    this.cy.on('cxttap', 'edge', (event) => {
      this.onRightClickEdge(event, event.target.id(), this.edgeItem)
    });

    this.cy.on('click', (event) => {
      this.onClearAnySelection()
    });

    this.cy.on('click', 'node', (event) => {
      this.onLeftClickNode(event, event.target.id(), this.nodeItem)
    });

    this.cy.on('click', 'edge', (event) => {
      this.onLeftClickEdge(event, event.target.id(), this.edgeItem)
    });

    this.cy.on('mouseover', (event) => {
      //this.logger.info(event)
    });

    // Decode URL
    this.route.url.subscribe(activeRoute => {
      this.activeRoute = activeRoute.join('/')
    })

    // Decode query params
    this.route.queryParams.subscribe(activeQueryParams => {
      this.activeQueryParams = activeQueryParams
    })

    // Decode params
    this.route.params.subscribe(async (params) => {
      this.id = params['label'];

      let graph = await this.graphsServiceApi.findOne(this.id + "")
      if (graph) {
        this.store.dispatch(retrievedGraph({ graph: graph }))
      }
    });

    setTimeout(() => {
      this.store.dispatch(setDrawMode({
        message: false
      }))

      this.store.dispatch(setGroupMode({
        message: true
      }))
    })
  }

  selectGraphItem(params: any | undefined, items: MenuItem[] | undefined, navigate: boolean): void {
    if (params.nodeId) {
      this.selectorDisplay = params.nodeId
      this.activeQueryParams = {
        nodeId: params.nodeId,
        zoom: this.cy?.zoom()
      }
      if (!this.firstLoad) {
        // Center on this node
        let selected = this.cy?.$(`#${this.base16.encode(params.nodeId)}`);
        this.logger.info("Center on node", params.nodeId, selected)
        this.cy?.center(selected)
        this.firstLoad = true
      }
    }
    if (params.edgeId) {
      this.selectorDisplay = params.edgeId
      this.activeQueryParams = {
        edgeId: params.edgeId,
        zoom: this.cy?.zoom()
      }
      if (!this.firstLoad) {
        // Center on this edge
        let selected = this.cy?.$(`#${this.base16.encode(params.edgeId)}`);
        this.logger.info("Center on node", params.edgeId, selected)
        this.cy?.center(selected)
        this.firstLoad = true
      }
    }
    if (items) {
      this.items = items
    }
    if (navigate) {
      // Apply new query params
      this.router.navigate([this.activeRoute], {
        queryParams: this.activeQueryParams
      });
    }
  }

  dockRightItems: MenuItem[] = [
    {
      label: 'Export JSONDATA to build rules',
      tooltipOptions: {
        tooltipLabel: "Export JSONDATA to build rules",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "dock/export-jsondata.png",
      command: () => {
        // build facts
        let fact = this.buildFacts()
        this.clipboardService.copyTextToClipboard(JSON.stringify(fact))
        this.messageService.add({
          key: 'bc', severity: 'info', summary: 'Info', detail: `Store JSONDATA in clipboard`
        });
      }
    },
    {
      label: 'Export GEXF to clipboard',
      tooltipOptions: {
        tooltipLabel: "Export GEXF to clipboard",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "dock/export-gexf.png",
      command: () => {
        if (this.id) {
          this.gexf(this.id, this.id, this.currentStyle, this.currentRules)
          this.messageService.add({
            key: 'bc', severity: 'info', summary: 'Info', detail: `Store GEXF in clipboard`
          });
        }
      }
    },
    {
      label: 'Export GRAPHML to clipboard',
      tooltipOptions: {
        tooltipLabel: "Export GRAPHML to clipboard",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "dock/export-graphml.png",
      command: () => {
        if (this.id) {
          this.graphml(this.id, this.id, this.currentStyle, this.currentRules)
          this.messageService.add({
            key: 'bc', severity: 'info', summary: 'Info', detail: `Store GRAPHML in clipboard`
          });
        }
      }
    },
    {
      label: 'Export PNG',
      tooltipOptions: {
        tooltipLabel: "Export PNG",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "dock/export-png.png",
      command: () => {
        // put the png data in an img tag
        if (document) {
          let png = this.cy?.png({
            bg: 'white',
            full: this.preferences.full,
            maxWidth: this.preferences.maxWidth ? Number(this.preferences.maxWidth) : 1024,
            maxHeight: this.preferences.maxHeight ? Number(this.preferences.maxHeight) : 768
          }) || ""
          this.logger.info(`PNG ${this.preferences.full} ${this.preferences.maxWidth} ${this.preferences.maxHeight}`)
          this.myPng?.nativeElement.setAttribute('src', png);
        }
        this.displayExportPng = true
      }
    },
    {
      label: 'Save',
      tooltipOptions: {
        tooltipLabel: "Save current diagram in local storage",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "dock/save.png",
      command: () => {
        if (this.id) {
          this.logger.info("SAVE/META", this.currentStyle, this.currentRules)
          let _graph: SysGraph = this.toSysGraph(this.id, this.id, this.currentStyle, this.currentRules)
          this.logger.info("SAVE", _graph)
          // Store this entity
          // TODO
          this.messageService.add({
            key: 'bc', severity: 'info', summary: 'Info', detail: `Save graph ${this.id}`
          });
        }
      }
    }
  ]

  selectedAlias: any
  dockLeftItems: MenuItem[] = [
    {
      label: 'Finder',
      tooltipOptions: {
        tooltipLabel: "Find node(s) or edges(s) and center on it",
        tooltipPosition: 'right',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "dock/find-element.png",
      command: () => {
        // Scan all nodes and build all alias
        let allAlias: any[] = _.filter(_.map(this.cy?.elements('node'), (node) => {
          return {
            alias: node.data()['alias'],
            label: node.data()['label'],
            id: this.base16.decode(node.data()['id']),
          }
        }), (alias) => {
          return alias.alias
        });

        let allTargets: any = {
        }

        // Find target node
        _.each(allAlias, (current) => {
          let encoded = this.base16.encode(current.alias)
          let target = this.cy?.$(`#${encoded}`)
          if (target && target.length > 0) {
            current.target = {
              id: current.alias,
              label: target[0].data()['label']
            }

            // Build all target
            if (allTargets[encoded]) {
              allTargets[encoded].aliases.push(current)
            } else {
              allTargets[encoded] = {
                label: target[0].data()['label'],
                aliases: [current]
              }
            }
          } else {
            this.raiseError("Unknown target", current.alias)
          }
        });

        this.alias = []

        _.each(allTargets, (values, key) => {
          let treeTarget: TreeNode = {
            "key": key,
            "label": `${values.label} #${this.base16.decode(key)}`,
            "data": {
              "id": this.base16.decode(key),
              "label": values.label,
            },
            "expandedIcon": "pi pi-folder-open",
            "collapsedIcon": "pi pi-folder",
            "children": []
          }
          _.each(values.aliases, (value) => {
            treeTarget.children?.push({
              "key": this.base16.encode(value.id),
              "label": `${value.label} #${value.id}`,
              "leaf": true,
              "icon": "pi pi-fw pi-clone",
              "data": {
                "id": value.id,
                "label": value.label
              }
            })
          })
          this.alias.push(treeTarget)
        })

        this.displayFinder = true;
      }
    }
  ]

  dockBottomItems: MenuItem[] = [
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  nodeItem = [
    {
      label: 'Drop',
      icon: 'pi pi-trash',
      command: () => {
        // Check if any selection
        if (!this.currentSelectedNode) {
          return
        }

        // Drop selection
        this.cy?.$(`#${this.currentSelectedNode.data().id}`).remove()
      }
    },
    {
      label: 'Clone',
      icon: 'pi pi-clone',
      command: () => {
        this.onCloneNode(this.currentSelectedNode)
        this.onClearAnySelection()
      }
    },
    {
      label: 'Edit',
      icon: 'pi pi-book',
      command: async () => {
        // Check if any selection
        if (!this.currentSelectedNode) {
          return
        }

        if (!this.currentStyle) {
          return
        }

        // Retrieve all tags
        let allTags: any = _.uniq(_.map(_.filter((await this.styleApiService.findOne(this.currentStyle))?.tags, (tag) => tag.label && tag.selector == 'node'), (tag: any) => {
          return {
            label: tag.label,
            value: tag.label
          }
        }))
        allTags.unshift({
          label: '',
          value: ''
        });

        // any clone
        let clone = this.currentSelectedNode.data().clone ? this.currentSelectedNode.data().clone : this.currentSelectedNode.data().id

        // Capture data will be used to apply update
        this.captureData = {
          id: this.currentSelectedNode.data().id,
          clone: this.base16.decode(clone),
          label: this.currentSelectedNode.data().label,
          alias: this.currentSelectedNode.data().alias,
          tag: this.currentSelectedNode.data().tag,
          group: this.currentSelectedNode.data().group,
          tags: allTags
        }

        // Async init to update current selection
        setTimeout(() => {
          this.captureData.tag = this.currentSelectedNode.data().tag
        }, 100)

        // Display dialog box
        this.displaySelectionNode = true;
      }
    },
    {
      label: 'Documentation',
      icon: 'pi pi-eye',
      command: () => {
        this.displayMarkdown = true;
      }
    },
    {
      label: 'Link to node',
      icon: 'pi pi-upload',
      command: () => {
        let myCy: any = this.cy
        this.edgehandles = myCy.edgehandles()
        this.edgehandles.start(this.currentSelectedNode)
        this.onClearAnySelection()
      }
    },
    {
      label: 'Goto to alias',
      icon: 'pi pi-arrow-right',
      command: () => {
        this.onSelectAlias(this.currentSelectedNode)
      }
    }
  ];

  // Go to alias
  onSelectAlias(currentSelectedNode: any): void {
    if (currentSelectedNode.data() && currentSelectedNode.data().alias) {
      // selected node
      let selected = this.cy?.$(`#${this.base16.encode(currentSelectedNode.data().alias)}`);
      this.logger.info("Alias", currentSelectedNode.data().alias, selected)
      this.cy?.center(selected)
    }
  }

  private findNode(captureData: any): cy.CollectionReturnValue | undefined {
    // Clone target must be unique
    if (captureData.clone !== undefined && captureData.clone != "") {
      let found = this.cy?.$(`#${this.base16.encode(captureData.clone)}`)
      if (captureData.id !== this.base16.encode(captureData.clone) && found && found.length > 0) {
        this.raiseError('While checking unicity of', captureData.clone)
        return
      }
    }
    return this.cy?.$(`#${captureData.id}`)
  }

  applyNodeUpdate(captureData: any): void {
    let findIt = this.findNode(captureData)

    findIt?.data('clone', this.base16.encode(captureData.clone))
      .data('alias', captureData.alias)
      .data('group', captureData.group ? captureData.group : "")
      .data('label', captureData.label)
      .data('tag', captureData.tag);
    this.displaySelectionNode = false

    // Apply ruleset on each update
    if (this.preferences.applyRules) {
      this.applyRuleset(false, false)
    }
  }

  applyLabelize(captureData: any): void {
    let label: string = captureData.label.toLowerCase()
    label = _.kebabCase(label)
    captureData.clone = `${captureData.tag}/${label}`
  }

  edgeItem = [
    {
      label: 'Drop',
      icon: 'pi pi-trash',
      command: () => {
        // Check if any selection
        if (!this.currentSelectedEdge) {
          return
        }

        // Drop selection
        this.cy?.$(`#${this.currentSelectedEdge.data().id}`).remove()
      }
    },
    {
      label: 'Edit',
      icon: 'pi pi-book',
      command: async () => {
        // Check if any selection
        if (!this.currentSelectedEdge) {
          return
        }

        if (!this.currentStyle) {
          return
        }

        // Retrieve all tags
        let allTags: any = _.uniq(_.map(_.filter((await this.styleApiService.findOne(this.currentStyle))?.tags, (tag) => tag.label && tag.selector == 'edge'), (tag: any) => {
          return {
            label: tag.label,
            value: tag.label
          }
        }))
        allTags.unshift({
          label: '',
          value: ''
        });

        // Capture data will be used to apply update
        this.captureData = {
          id: this.currentSelectedEdge.data().id,
          label: this.currentSelectedEdge.data().label,
          tag: this.currentSelectedEdge.data().tag,
          tags: allTags
        }

        // Async init to update current selection
        setTimeout(() => {
          this.captureData.tag = this.currentSelectedEdge.data().tag
        }, 100)

        // Display dialog box
        this.displaySelectionEdge = true;
      }
    },
    {
      label: 'Documentation',
      icon: 'pi pi-eye',
      command: () => {
        this.displayMarkdown = true;
      }
    }
  ];

  applyEdgeUpdate(captureData: any): void {
    this.cy?.$(`#${captureData.id}`)
      .data('label', captureData.label)
      .data('tag', captureData.tag);
    this.displaySelectionEdge = false

    // Apply ruleset on each update
    if (this.preferences.applyRules) {
      this.applyRuleset(false, false)
    }
  }

  async applyChangeProperties(style: string, rule: any): Promise<void> {
    let styleFound = await this.styleApiService.findByLocation(style)
    this.logger.info(`applyChangeProperties style ${style} with ${styleFound.id}`)

    let styles = await this.retrieveStyle(styleFound.id)
    console.log(styles)
    this.cy?.style(styles)
    setTimeout(async () => {
      // Style counter
      this.currentStyle = style
      let styleEntities = await this.styleApiService.findOne(styleFound.id)
      let styleCounter = styleEntities.tags?.length
      if (styleCounter) {
        this.currentStyleCounter = styleCounter
      }
      // Style counter
      this.logger.info(`Apply ruleset`, rule)
      this.currentRules = rule
      let ruleCounter = (await this.ruleApiService.findOne(this.currentRules))?.rules.length
      if (ruleCounter) {
        this.currentRulesCounter = ruleCounter
      } else {
        this.logger.warn(`Ruleset ${rule} empty`)
      }
      this.displayChangeProperties = false
    }, 1)
  }

  coreItem = [
    {
      label: 'Fit',
      icon: 'pi pi-globe',
      command: () => {
        this.cy?.fit()
      }
    }
  ];

  private buildFacts(): any {
    let nodes = _.map(this.cy?.nodes(), (node) => {
      return {
        "element": {
          "type": "node",
          "data": {
            "id": this.base16.decode(node.data().id),
            "label": node.data().label,
            "tag": node.data().tag,
            "alias": node.data().alias
          }
        }
      }
    })

    let edges = _.map(this.cy?.edges(), (edge) => {
      return {
        "element": {
          "type": "edges",
          "data": {
            "id": this.base16.decode(edge.data().id),
            "label": edge.data().label,
            "tag": edge.data().tag,
            "source": {
              "id": this.base16.decode(edge.source().id()),
              "tag": edge.source().data().tag
            },
            "target": {
              "id": this.base16.decode(edge.target().id()),
              "tag": edge.target().data().tag
            }
          }
        }
      }
    })

    let facts: any[] = []
    _.each(nodes, (node) => {
      facts.push(node)
    })
    _.each(edges, (edge) => {
      facts.push(edge)
    })

    return facts
  }

  // Apply ruleset
  applyRuleset(displaySidebar: boolean, onlyFail: boolean): void {
    // build facts
    let facts = this.buildFacts()

    // Apply fact
    this.logger.debug("Execute", this.currentRules, facts)
    if (onlyFail) {
      this.ruleApiService.jsondataEngine(this.currentRules, facts, false, false).then((result) => {
        this.logger.info(result)
        this.jsonRules = result.treenodes
        this.currentRulesFail = result.failure.length
        this.currentRulesSuccess = result.success.length
        this.displaySidebar = displaySidebar
      })
    } else {
      this.ruleApiService.jsondataEngine(this.currentRules, facts, false, true).then((result) => {
        this.logger.info(result)
        this.jsonRules = result.treenodes
        this.currentRulesFail = result.failure.length
        this.currentRulesSuccess = result.success.length
        this.displaySidebar = displaySidebar
      })
    }
  }

  // Go to alias
  onSelectCurrentAlias(event: any): void {
    // selected node
    let selected = this.cy?.$(`#${this.selectedAlias.key}`);
    this.logger.info(`Center on alias ${this.selectedAlias.key}`)
    this.cy?.center(selected)
    this.displayFinder = false
  }

  // Go to item
  onSelectItem(item: any): void {
    this.logger.info("SELECT/ITEM", item)
    // selected node
    this.logger.info(`Center on item ${item.node.data.uid}`)
    let selected = this.cy?.$(`#${item.node.data.uid}`);
    this.cy?.center(selected)
    this.displaySidebar = false
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      _.each(this.subscriptions, (subscription) => {
        subscription.unsubscribe();
      })
    }
  }

  onHide(): void {
    this.onClearAnySelection()
  }

  captureData: any = {}
  createNewNode(): void {
    let id = this.base16.encode(`default@${uuidv4()}`)
    this.cy?.add([{
      data: {
        id: id,
        label: "default",
        cdata: "TODO ...",
        tag: ""
      },
      position: {
        x: 0,
        y: 0
      }
    }])
    let selected = this.cy?.$(`#${id}`);
    this.logger.info(`Center on created node ${id}`)
    this.cy?.center(selected)
  }

  async changeProperties(): Promise<void> {
    this.captureData = {
      styles: _.map((await this.styleApiService.findAllLazy()), (style) => style.id),
      style: "default",
      /**
       * TODO
      rules: _.map(this.rulesService.findAll(), (rule) => rule.id),
       */
      rule: "default"
    }
    this.displayChangeProperties = true
  }

  selectedNode: any
  nodeSelect(event: any): void {
    let anims = [
      { "opacity": 0.2 },
      { "opacity": 1 }
    ]
    // selected node
    let selected = this.cy?.$(`#${this.selectedNode.key}`);
    this.logger.info(`Center on select node ${this.selectedNode.key}`)
    this.cy?.center(selected)
    this.displayFinder = false
  }

  nodeSummarySelect(key: any): void {
    let selected = this.cy?.$(`#${key}`);
    this.logger.info(`Center on select node ${key}`)
    this.cy?.center(selected)
    this.displaySummary = false
  }

  buildChildNodes(graph: any): TreeNode {
    return {
      "key": "1",
      "label": "Nodes",
      "data": {
        uid: 1,
        label: "Nodes"
      },
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": _.map(graph.nodes, (node) => {
        return {
          "key": node.id,
          "leaf": true,
          "label": node.label,
          "data": {
            _id: node.id,
            label: node.label
          },
          "icon": "pi pi-fw pi-clone",
          "children": []
        }
      })
    }
  }

  buildChildEdges(graph: any): TreeNode {
    return {
      "key": "1",
      "label": "Edges",
      "data": {
        uid: 2,
        label: "Edges"
      },
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": _.map(graph.edges, (edge) => {
        return {
          "key": edge.id,
          "leaf": true,
          "label": edge.label,
          "data": {
            _id: edge.id,
            _source: edge.source,
            _target: edge.target,
            label: edge.label
          },
          "icon": "pi pi-fw pi-share-alt",
          "children": []
        }
      })
    }
  }

  onFileDropped(event: any): void {
    let filename = event[0].name
    if (this.id && filename.startsWith("style") && filename.endsWith(".json")) {
      this.onFileStyleDropped(event)
      return
    }
    if (this.id && filename.startsWith("rule") && filename.endsWith(".json")) {
      this.onFileRuleDropped(event)
      return
    }
    if (this.id && filename.endsWith(".gexf")) {
      this.onFileGexfDropped(event)
      return
    }
  }

  onFileGexfDropped(event: any): void {
    this.messageService.add({
      key: 'bc', severity: 'info', summary: 'Upload/GEXF', detail: `Filename ${event[0].name}`
    });
    if (this.id) {
      // Load this graph
      this.graphsServiceApi.uploadHandler(event[0], this.id, this.id).then((loaded) => {
        // Store this entity
        // TODO
        this.store.dispatch(retrievedGraph({ graph: loaded }))
      })
    }
  }

  onFileStyleDropped(event: any): void {
    let style: string = event[0].name
    this.currentStyle = style

    this.messageService.add({
      key: 'bc', severity: 'info', summary: 'Upload/Style', detail: `Filename ${event[0].name}`
    });

    let reader = new FileReader();
    reader.addEventListener("loadend", async () => {
      let save: SysStyles = {
        id: style,
        location: "",
        label: "",
        tags: JSON.parse(reader.result + "")
      }
      /**
       * TODO
      await this.styleApiService.store(save, (entity) => {
        entity.tags = save.tags
      })
       */

      // Apply style and rules
      await this.applyChangeProperties(this.currentStyle, this.currentRules)

      this.store.dispatch(retrievedStyle({ style: save }))
    });
    reader.readAsText(event[0])
  }

  onFileRuleDropped(event: any): void {
    let rule = event[0].name
    this.currentRules = rule

    this.messageService.add({
      key: 'bc', severity: 'info', summary: 'Upload/Rule', detail: `Filename ${rule}`
    });

    let reader = new FileReader();
    reader.addEventListener("loadend", async () => {
      // Load rule
      /**
       * TODO
      this.rulesService.load(rule, JSON.parse(reader.result + ""))
       */

      // Apply style and rules
      await this.applyChangeProperties(this.currentStyle, this.currentRules)
    });
    reader.readAsText(event[0])
  }

  currentSelectedNode: any = undefined
  currentSelectedEdge: any = undefined

  onRightClickNode(event: any, target: string, items: MenuItem[] | undefined): void {
    // Select node
    this.selectGraphItem({
      nodeId: this.base16.decode(target)
    }, items, true)
    this.logger.info('[NODE] rclick', event)
  }

  onRightClickEdge(event: any, target: string, items: MenuItem[] | undefined): void {
    // Select edge
    this.selectGraphItem({
      edgeId: this.base16.decode(target)
    }, items, true)
    this.logger.info('[EDGE] rclick', event)
  }

  onDblClickNode(event: any, target: string, items: MenuItem[] | undefined): void {
    // Select node
    this.selectGraphItem({
      nodeId: this.base16.decode(target)
    }, items, true)
    this.logger.info('[NODE] dblclick', event)
  }

  onDblClickEdge(event: any, target: string, items: MenuItem[] | undefined): void {
    // Select edge
    this.selectGraphItem({
      edgeId: this.base16.decode(target)
    }, items, true)
    this.logger.info('[EDGE] dblclick', event)
  }

  onLeftClickNode(event: any, target: string, items: MenuItem[] | undefined): void {
    // Select node
    this.selectGraphItem({
      nodeId: this.base16.decode(target)
    }, items, true)
    this.logger.info('[NODE] lclick', event)

    this.currentSelectedEdge = undefined
    this.currentSelectedNode = event.target[0]
    this.selectorTagDisplay = this.currentSelectedNode.data().tag
    this.selectorLabelDisplay = this.currentSelectedNode.data().label

    // Find any documentation
    let currentDocumentation = ""
    if (this.currentSelectedNode.data().cdata) {
      // Read current documentation
      currentDocumentation = this.currentSelectedNode.data().cdata
      // If node is an alias only display target node documentation
      if (this.currentSelectedNode.data().alias) {
        let target = this.base16.encode(this.currentSelectedNode.data().alias)
        let targets = this.cy?.$(`#${target}`)
        if (targets) {
          currentDocumentation = targets[0].data().cdata
        }
      }
    }

    // Any documentation
    if (this.currentSelectedNode.data().cdata) {
      this.captureData = {
        editable: false,
        isAlias: this.currentSelectedNode.data().alias ? true : false,
        selectElementId: this.currentSelectedNode.data().id,
        selectElementCdata: this.markdownService.render(currentDocumentation),
        selectElementRawCdata: currentDocumentation
      }
    } else {
      this.captureData = {
        editable: false,
        isAlias: this.currentSelectedNode.data().alias ? true : false,
        selectElementId: this.currentSelectedNode.data().id,
        selectElementCdata: "",
        selectElementRawCdata: currentDocumentation
      }
    }
    this._lockedElement = this.currentSelectedNode.locked()
  }

  onLeftClickEdge(event: any, target: string, items: MenuItem[] | undefined): void {
    // Select edge
    this.selectGraphItem({
      edgeId: this.base16.decode(target)
    }, items, true)
    this.logger.info('[EDGE] lclick', event)

    this.selectorDisplay = this.base16.decode(event.target.id())
    this.currentSelectedNode = undefined
    this.currentSelectedEdge = event.target[0]
    this.selectorTagDisplay = this.currentSelectedEdge.data().tag
    this.selectorLabelDisplay = this.currentSelectedEdge.data().label

    // Any documentation
    if (this.currentSelectedEdge.data().cdata) {
      this.captureData = {
        selectElementId: this.currentSelectedEdge.data().id,
        selectElementCdata: this.markdownService.render(this.currentSelectedEdge.data().cdata),
        selectElementRawCdata: this.currentSelectedEdge.data().cdata
      }
    } else {
      this.captureData = {
        selectElementId: this.currentSelectedEdge.data().id,
        selectElementCdata: "",
        selectElementRawCdata: this.currentSelectedEdge.data().cdata
      }
    }
  }

  previewNewCData(captureData: any): void {
    captureData.selectElementCdata = this.markdownService.render(captureData.selectElementRawCdata)
  }

  applyNewCData(captureData: any): void {
    this.logger.info("Apply new data on id", this.base16.decode(captureData.selectElementId))
    this.cy?.$(`#${captureData.selectElementId}`)
      .data('cdata', captureData.selectElementRawCdata)
    this.displayMarkdown = false
  }

  onCloneNode(nodes: any): void {
    if (nodes.length === 1 && nodes[0].isNode()) {
      this.cy?.add(_.map(nodes, (node) => {
        // Ignore the @ (due to other clone ... but not only)
        let idwithout = this.base16.decode(node.data()?.id).split('@')[0]
        let id = `${idwithout}@${uuidv4()}`
        let _node: any = {
          data: {
            id: this.base16.encode(id),
            label: node.data()?.label,
            alias: this.base16.decode(node.data()?.id),
            cdata: "TODO ...",
            group: "",
            tag: node.data()?.tag
          },
          position: {
            x: node.position().x + 50,
            y: node.position().y + 50
          }
        }
        // Decode parent property
        if (node.data()?.parent) {
          _node.data.parent = node.data()?.parent
        }
        this.logger.info("Clone node", _node)
        return _node
      }))
    }
  }

  onCloneEdge(edge: any): void {
  }

  onClearAnySelection(): void {
    this.logger.info("Clear selection")
    this.selectorDisplay = ""
    this.currentSelectedEdge = undefined
    this.currentSelectedNode = undefined
    this.items = this.coreItem;
  }

  async retrieveStyle(id: string): Promise<any[]> {
    let styles = await this.styleApiService.findOne(id)
    let tags = styles?.tags;

    let styleCss: Array<any> = []
    _.each(tags, (tag) => {
      if (!tag.label) {
        let data = {
          selector: `${tag.selector}`,
          css: tag.style?.css ? tag.style?.css : {}
        }
        // If content is not defined add a default function
        // Displaying label and group
        // add a star when node has documentation
        if (data.css.content === undefined) {
          data.css.content = (element: any) => {
            let cdata = element.data().cdata ? '*' : ''
            let alias = element.data().alias ? '@' : ''
            if (element.data().label && element.data().group) {
              return `${element.data().label} (${element.data().group}) ${cdata} ${alias}`
            }
            if (element.data().label) {
              return `${element.data().label} ${cdata} ${alias}`
            }
            return ""
          }
        }
        styleCss.push(data)
      } else {
        styleCss.push({
          selector: `${tag.selector}[tag = '${tag.label}']`,
          css: tag.style?.css ? tag.style?.css : {}
        })
      }
    })

    let allstyles: any[] = []
    _.each(styleCss, (style) => {
      allstyles.push(style)
    })

    return allstyles
  }

  handleChangeLock(event: any): void {
    if (!this.currentSelectedNode) {
      return
    }
    this.logger.info("lock", this.currentSelectedNode.data().id)
    let _item = this.cy?.$(`#${this.currentSelectedNode.data().id}`)
    this.logger.info("lock", _item)
    if (event.checked) {
      _item?.lock()
      _item?.animate({
        style: { "opacity": 0.2 }
      }, {
        duration: 1000
      })
    } else {
      _item?.animate({
        style: { "opacity": 1 }
      }, {
        duration: 1000
      })
      _item?.unlock();
    }
  }

  resolveClonedId(_id: string): string | undefined {
    let node = this.cy?.$(`#${_id}`)[0]
    return node?.data()['clone'] || node?.data()['id'] || undefined
  }

  toSysGraph(_id: string, _label: string, _style: string, _rules: string): SysGraph {
    let index: any = {}
    this.logger.info(`toSysGraph style: ${_style}`)
    return {
      id: _id,
      location: "default",
      style: _style ? _style : "default",
      rules: _rules ? _rules : "default",
      label: _label,
      nodes: _.map(this.cy?.nodes(), (node) => {
        let _node: SysNode = {
          // Clone data can override the original id
          id: node.data()['clone'] || node.data()['id'] || "",
          location: "default",
          label: node.data()['label'] || "",
          x: node.position().x || 0,
          y: node.position().y || 0,
          size: 10,
          color: "0",
          group: node.data()['group'],
          tag: node.data()['tag']
        }
        index[node.data()['id'] || ""] = _node
        if (node.data()['alias']) {
          _node.alias = node.data()['alias']
        }
        if (node.data()['cdata']) {
          _node.cdata = node.data()['cdata']
        }
        if (node.data()['parent']) {
          _node.parent = node.data()['parent']
        }
        return _node
      }),
      edges: _.map(this.cy?.edges(), (edge) => {
        // If one node is an edited clone pay attention du take the cloned id
        let source = this.resolveClonedId(edge.data().source)
        let target = this.resolveClonedId(edge.data().target)
        if (source === undefined || target === undefined) {
          this.logger.error("Internal error while resolving source and target")
          throw new String("Internal error while resolving source and target")
        }
        let _edge: SysEdge = {
          id: edge.data()['id'] || "",
          location: "default",
          label: edge.data()['label'] || "",
          source: source,
          target: target,
          cdata: edge.data()['cdata'],
          tag: edge.data()['tag']
        }
        if (edge.data()['cdata']) {
          _edge.cdata = edge.data()['cdata']
        }
        return _edge
      })
    }
  }

  gexf(_id: string, _label: string, _style: string, _rules: string): void {
    let _graph: SysGraph = this.toSysGraph(_id, _label, _style, _rules)
    // TODO
    // this.clipboardService.copyTextToClipboard(this.graphsService.toGexf(_graph).join('\n'))
  }

  graphml(_id: string, _label: string, _style: string, _rules: string): void {
    let _graph: SysGraph = this.toSysGraph(_id, _label, _style, _rules)
    // TODO
    // this.clipboardService.copyTextToClipboard(this.graphsService.toGraphml(_graph).join('\n'))
  }

  raiseError(summary: string, detail: string) {
    this.messageService.add({
      key: 'lc', severity: 'error', summary: summary, detail: detail
    });
  }

  dataGroupStatistics: any = {
    datasets: [{
      data: [
      ],
      backgroundColor: [
      ],
      label: 'Dataset'
    }],
    labels: [
    ]
  };
  displayGroupStatistic: boolean = false;

  dataTagStatistics: any = {
    datasets: [{
      data: [
      ],
      backgroundColor: [
      ],
      label: 'Dataset'
    }],
    labels: [
    ]
  };
  displayTagStatistic: boolean = false;

  chartOptions: any;
  config: any = {
    dark: false
  };

  updateChartOptions() {
    this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
  }

  getLightTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }

  getDarkTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        }
      }
    };
  }
}

