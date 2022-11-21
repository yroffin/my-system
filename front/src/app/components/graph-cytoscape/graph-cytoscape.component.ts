import { AfterViewInit, ANALYZE_FOR_ENTRY_COMPONENTS, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { GraphService } from 'src/app/services/graph.service';
import { retrievedGraph } from 'src/app/stats/graph.actions';
import { selectGraph, selectGraphs } from 'src/app/stats/graph.selectors';
import { selectTags } from 'src/app/stats/tag.selectors';
import { v4 as uuidv4 } from 'uuid';

// node.js, the same, but with sugar:
var md = require('markdown-it')();

import * as cy from 'cytoscape'
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

var edgehandles = require('cytoscape-edgehandles');
cy.use(edgehandles);

var automove = require('cytoscape-automove');
cy.use(automove);

var snapToGrid = require('cytoscape-snap-to-grid');
snapToGrid(cy); // register extension

import { BreadthFirstLayoutOptionsImpl, CircleLayoutOptionsImpl, ConcentricLayoutOptionsImpl, CoseLayoutOptionsImpl, DagreLayoutOptionsImpl, GridLayoutOptionsImpl } from './layout-options-impl';
import { style } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { SysEdge, SysGraph, SysNode, SysTag } from 'src/app/models/graph';
import { MenuItem, Message, MessageService, TreeNode } from 'primeng/api';
import { Base16Service } from 'src/app/services/base16.service';
import { NGXLogger } from 'ngx-logger';
import { TreeTable } from 'primeng/treetable';
import { DatabaseService } from 'src/app/services/database.service';
import { retrievedTagsList } from 'src/app/stats/tag.actions';
import { Subscription } from 'rxjs';
import { SysPreference } from 'src/app/models/preference';

declare var cytoscape: any

@Component({
  selector: 'app-graph-cytoscape',
  templateUrl: './graph-cytoscape.component.html',
  styleUrls: ['./graph-cytoscape.component.css']
})
export class GraphCytoscapeComponent implements OnInit, AfterViewInit, OnDestroy {

  displaySelectionNode: boolean = false;
  displaySelectionEdge: boolean = false;
  displayAlias: boolean = false;

  displayFinder: boolean = false;
  displayMarkdown: boolean = false;
  displayStyle: boolean = false;

  dockRightItems: MenuItem[] = [
    {
      label: 'Export GEXF to clipboard',
      tooltipOptions: {
        tooltipLabel: "Export GEXF to clipboard",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "assets/dock/export-gexf.png",
      command: () => {
        if (this.id) {
          this.gexf(this.id, this.id)
          this.messageService.add({
            severity: 'info', summary: 'Info', detail: `Store GEXF in clipboard`
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
      icon: "assets/dock/export-graphml.png",
      command: () => {
        if (this.id) {
          this.graphml(this.id, this.id)
          this.messageService.add({
            severity: 'info', summary: 'Info', detail: `Store GRAPHML in clipboard`
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
      icon: "assets/dock/export-png.png",
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
        tooltipLabel: "Save current diagram",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "assets/dock/save.png",
      command: () => {
        if (this.id) {
          let _graph: SysGraph = this.toSysGraph(this.id, this.id)
          this.databaseService.storeGraph(_graph)
          this.messageService.add({
            severity: 'info', summary: 'Info', detail: `Save graph`
          });
        }
      }
    }
  ]

  dockLeftItems: MenuItem[] = [
    {
      label: 'Finder',
      tooltipOptions: {
        tooltipLabel: "Find element(s)",
        tooltipPosition: 'right',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "assets/dock/find.png",
      command: () => {
        this.displayFinder = true;
      }
    },
    {
      id: "style",
      label: 'Display style',
      tooltipOptions: {
        tooltipLabel: "Display style simply drag and drop style file on this view",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "assets/dock/style.png",
      command: () => {
        this.displayStyle = true;
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

  @ViewChild('myCytoscape') myGraph?: ElementRef;
  @ViewChild('myPng') myPng?: ElementRef;
  @ViewChild('myTreeTable') myTreeTable?: TreeTable;
  subscriptions: any = [];

  preferences: SysPreference

  cy?: Core
  boxSelectionEnabled?: boolean
  displayExportPng = false
  displayTool = true

  searchNode = ""
  graphs: TreeNode[] = [];
  allNodes: any[] = [];
  allAlias: any[] = [];

  cols: any[] = [
    { field: 'label', header: 'Label' }
  ];

  breadFirstLayoutOptions?: LayoutOptions = new BreadthFirstLayoutOptionsImpl()
  concentricLayoutOptions?: LayoutOptions = new ConcentricLayoutOptionsImpl()
  circleLayoutOptions?: LayoutOptions = new CircleLayoutOptionsImpl()
  gridLayoutOptions?: LayoutOptions = new GridLayoutOptionsImpl()
  coseLayoutOptions?: LayoutOptions = new CoseLayoutOptionsImpl()
  dagreLayoutOptions?: LayoutOptions = new DagreLayoutOptionsImpl()

  id?: string
  items: MenuItem[] = [];

  groupEnabled: boolean = true;
  selectorDisplay: string = "";
  drawModeEnabled: boolean = false;
  edgehandles: any;
  rules: any = [];

  graph$ = this.store.select(selectGraph);
  graphs$ = this.store.select(selectGraphs);

  _lockedElement: boolean = false;

  constructor(
    private graphsService: GraphService,
    private databaseService: DatabaseService,
    private clipboardService: ClipboardService,
    private logger: NGXLogger,
    private messageService: MessageService,
    private base16: Base16Service,
    private store: Store, private route: ActivatedRoute) {

    this.preferences = this.databaseService.retrievePreferences()

    this.subscriptions.push(this.graph$.subscribe(graph => {
      if (!graph) {
        return
      }
      // refresh render
      this.cy?.startBatch()
      this.cy?.boxSelectionEnabled(this.boxSelectionEnabled)
      this.cy?.nodes().remove()
      this.cy?.edges().remove()

      this.graphs = []

      if (graph.nodes) {
        this.graphs.push(this.buildChildNodes(graph))

        // Capture all node id (for alias)
        this.allNodes = _.map(graph.nodes, (node) => {
          return {
            label: this.base16.decode(node.id),
            value: this.base16.decode(node.id)
          }
        })
        this.allNodes.unshift({
          label: '',
          value: ''
        });

        this.cy?.add(_.map(graph.nodes, (node) => {
          let _node: any = {
            data: {
              id: node.id,
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

        this.cy?.add(_.map(graph.edges, (edge) => {
          let _edge = {
            data: {
              id: edge.id,
              label: edge.label,
              cdata: edge.cdata,
              source: edge.source || "",
              target: edge.target || "",
              _source: base16.decode(edge.source || ""),
              _target: base16.decode(edge.target || ""),
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
    }))

    this.subscriptions.push(this.tags$.subscribe(_tags => {
      if (!_tags) {
        return
      }
      this.tags = JSON.stringify(_tags, null, 2)
      this.cy?.style(this.retrieveStyle())
    }))
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    let tags = this.graphsService.getAllTags()
    this.store.dispatch(retrievedTagsList({ tags }))

    this.items = this.coreItem;
  }

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
      command: () => {
        // Check if any selection
        if (!this.currentSelectedNode) {
          return
        }

        // Retrieve all tags
        let allTags: any = _.uniq(_.map(_.filter(this.databaseService.findAllTags(), (tag) => tag.label && tag.selector == 'node'), (tag: any) => {
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

  applyNodeUpdate(captureData: any): void {
    // Clone target must be unique
    if (captureData.clone !== undefined && captureData.clone != "") {
      let found = this.cy?.$(`#${this.base16.encode(captureData.clone)}`)
      if (captureData.id !== this.base16.encode(captureData.clone) && found && found.length > 0) {
        this.messageService.add({
          severity: 'error', summary: 'While checking unicity of', detail: captureData.clone
        });
        return
      }
    }
    this.cy?.$(`#${captureData.id}`)
      .data('clone', this.base16.encode(captureData.clone))
      .data('alias', captureData.alias)
      .data('group', captureData.group)
      .data('label', captureData.label)
      .data('tag', captureData.tag);
    this.displaySelectionNode = false
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
      command: () => {
        // Check if any selection
        if (!this.currentSelectedEdge) {
          return
        }

        // Retrieve all tags
        let allTags: any = _.uniq(_.map(_.filter(this.databaseService.findAllTags(), (tag) => tag.label && tag.selector == 'node'), (tag: any) => {
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
  }

  coreItem = [
    {
      label: 'Add new node',
      icon: 'pi pi-plus',
      command: () => {
        this.createNewNode()
      }
    },
    {
      label: 'Show alias',
      icon: 'pi pi-angle-double-right',
      command: () => {
        // Scan all nodes
        this.allAlias = _.filter(_.map(this.cy?.elements('node'), (node) => {
          return {
            alias: node.data()['alias'],
            label: node.data()['label'],
            id: this.base16.decode(node.data()['id']),
          }
        }), (alias) => {
          return alias.alias
        });

        // Find target node
        _.each(this.allAlias, (current) => {
          let target = this.cy?.$(`#${this.base16.encode(current.alias)}`)
          if (target) {
            current.target = {
              id: current.alias,
              label: target[0].data()['label']
            }
          }
        });

        this.allAlias = _.sortBy(this.allAlias, (current) => {
          return current.alias
        })

        this.logger.info(this.allAlias)

        this.displayAlias = true
      }
    },
    {
      label: 'Group',
      icon: 'pi pi-share-alt',
      items: [
        {
          label: 'Toggle',
          icon: 'pi pi-undo',
          command: () => {
            this.onToggleGroupEnabled()
          }
        },
        {
          label: 'Statistics',
          icon: 'pi pi-chart-pie',
          command: () => {
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
        }
      ]
    },
    {
      label: 'Layout',
      icon: 'pi pi-sitemap',
      items: [
        {
          label: 'Bread First Layout',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            if (this.breadFirstLayoutOptions) {
              this.cy?.layout(this.breadFirstLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
        },
        {
          label: 'Concentric Layout',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            if (this.concentricLayoutOptions) {
              this.cy?.layout(this.concentricLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
        },
        {
          label: 'Circle Layout',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            if (this.circleLayoutOptions) {
              this.cy?.layout(this.circleLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
        },
        {
          label: 'Grid Layout',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            if (this.gridLayoutOptions) {
              this.cy?.layout(this.gridLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
        },
        {
          label: 'Cose Layout',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            if (this.coseLayoutOptions) {
              this.cy?.layout(this.coseLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
        },
        {
          label: 'Dagre Layout',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            if (this.dagreLayoutOptions) {
              this.cy?.layout(this.dagreLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
        },
      ]
    },
    {
      label: 'Zoom',
      icon: 'pi pi-circle',
      items: [
        {
          label: '0.1',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            this.cy?.zoom(0.1)
          }
        },
        {
          label: '0.2',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            this.cy?.zoom(0.2)
          }
        },
        {
          label: '0.3',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            this.cy?.zoom(0.3)
          }
        },
        {
          label: '0.5',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            this.cy?.zoom(0.5)
          }
        },
        {
          label: '0.6',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            this.cy?.zoom(0.6)
          }
        },
        {
          label: '0.75',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            this.cy?.zoom(0.75)
          }
        },
        {
          label: '1',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            this.cy?.zoom(1)
          }
        },
        {
          label: 'fit',
          icon: 'pi pi-ellipsis-h',
          command: () => {
            this.cy?.fit()
          }
        }
      ]
    },
    {
      label: 'Draw mode',
      icon: 'pi pi-share-alt',
      items: [
        {
          label: 'Toggle',
          icon: 'pi pi-undo',
          command: () => {
            this.onToggleDrawModeEnabled()
          }
        }
      ]
    }
  ];

  // Go to alias
  onSelectCurrentAlias(_id: any): void {
    // selected node
    let selected = this.cy?.$(`#${this.base16.encode(_id)}`);
    this.logger.info("Alias", _id)
    this.cy?.center(selected)
    this.displayAlias = false
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
    this.cy?.add([{
      data: {
        id: this.base16.encode(`default@${uuidv4()}`),
        label: "default",
        cdata: "TODO ...",
        tag: ""
      },
      position: {
        x: 0,
        y: 0
      }
    }])
  }

  selectedNode: any
  nodeSelect(event: any): void {
    let anims = [
      { "opacity": 0.2 },
      { "opacity": 1 }
    ]
    // selected node
    let selected = this.cy?.$(`#${this.selectedNode.key}`);
    this.cy?.center(selected)
    if (this.selectedNode.data._source) {
      this.animate(this.cy?.$(`#${this.selectedNode.data._source}`), anims)
      this.animate(this.cy?.$(`#${this.selectedNode.data._target}`), anims)
    } else {
      this.animate(this.cy?.$(`#${this.selectedNode.data._id}`), anims)
    }
  }

  onToggleGroupEnabled(): void {
    if (this.groupEnabled) {
      this.groupEnabled = false
      _.each(this.rules, (rule) => {
        rule.disable()
      })
    } else {
      this.groupEnabled = true
      _.each(this.rules, (rule) => {
        rule.enable()
      })
    }
    this.onClearAnySelection()
  }

  onToggleDrawModeEnabled(): void {
    if (this.drawModeEnabled) {
      this.edgehandles.disableDrawMode()
      this.drawModeEnabled = false;
    } else {
      this.edgehandles.enableDrawMode()
      this.drawModeEnabled = true;
    }
    this.onClearAnySelection()
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
    if (this.id && filename.endsWith(".json")) {
      this.onFileStyleDropped(event)
      return
    }
    if (this.id && filename.endsWith(".gexf")) {
      this.onFileGexfDropped(event)
      return
    }
  }

  onFileGexfDropped(event: any): void {
    this.messageService.add({
      severity: 'info', summary: 'Upload/GEXF', detail: `Filename ${event[0].name}`
    });
    if (this.id) {
      // Load this graph
      this.graphsService.uploadHandler(event[0], this.id, this.id).then((loaded) => {
        this.databaseService.storeGraph(loaded)
        this.store.dispatch(retrievedGraph({ graph: loaded }))
      })
    }
  }

  tags: string = ""
  tags$ = this.store.select(selectTags);

  onFileStyleDropped(event: any): void {
    this.messageService.add({
      severity: 'info', summary: 'Upload/Style', detail: `Filename ${event[0].name}`
    });
    let reader = new FileReader();
    reader.addEventListener("loadend", async () => {
      let data: any = JSON.parse(reader.result + "");
      this.graphsService.saveTags(data)
      this.store.dispatch(retrievedTagsList({ tags: data }))
    });
    reader.readAsText(event[0])
  }

  currentSelectedNode: any = undefined
  currentSelectedEdge: any = undefined

  ngAfterViewInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.cy = cy({
      container: this.myGraph?.nativeElement,
      layout: { name: 'preset' },
      motionBlur: true,
      selectionType: 'single',
      boxSelectionEnabled: false,
      style: this.retrieveStyle(),
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

    this.cy.on('dblclick', 'node', (event) => {
      this.items = this.nodeItem;
      this.selectorDisplay = this.base16.decode(event.target.id())
      this.onDblClickNode(event)
    });

    this.cy.on('dblclick', 'edge', (event) => {
      this.items = this.edgeItem;
      this.selectorDisplay = this.base16.decode(event.target.id())
      this.onDblClickEdge(event)
    });

    this.cy.on('cxttap', 'node', (event) => {
      this.items = this.nodeItem;
      this.selectorDisplay = this.base16.decode(event.target.id())
      this.onRightClickNode(event)
    });

    this.cy.on('cxttap', 'edge', (event) => {
      this.items = this.edgeItem;
      this.selectorDisplay = this.base16.decode(event.target.id())
      this.onRightClickEdge(event)
    });

    this.cy.on('click', (event) => {
      this.onClearAnySelection()
    });

    this.cy.on('click', 'node', (event) => {
      this.items = this.nodeItem;
      this.selectorDisplay = this.base16.decode(event.target.id())
      this.onLeftClickNode(event)
    });

    this.cy.on('click', 'edge', (event) => {
      this.items = this.edgeItem;
      this.selectorDisplay = this.base16.decode(event.target.id())
      this.onLeftClickEdge(event)
    });

    this.cy.on('mouseover', (event) => {
      //this.logger.info(event)
    });

    this.route.params.subscribe(params => {
      this.id = params['label'];

      let _graph = this.graphsService.getGraph(this.id + "")
      if (_graph) {
        this.store.dispatch(retrievedGraph({ graph: _graph }))
      }
    });
  }

  onRightClickNode(event: any): void {
    this.logger.info('[NODE] rclick', event)
  }

  onRightClickEdge(event: any): void {
    this.logger.info('[EDGE] rclick', event)
  }

  onDblClickNode(event: any): void {
    this.logger.info('[NODE] dblclick', event)
  }

  onDblClickEdge(event: any): void {
    this.logger.info('[EDGE] dblclick', event)
  }

  onLeftClickNode(event: any): void {
    this.logger.info('[NODE] lclick', event)
    this.selectorDisplay = this.base16.decode(event.target.id())
    this.messageService.add({
      severity: 'info', summary: `Select node ${event.target.data().label}`, detail: `${this.base16.decode(event.target.id())}`
    });
    this.currentSelectedEdge = undefined
    this.currentSelectedNode = event.target[0]
    // Any documentation
    if (this.currentSelectedNode.data().cdata) {
      this.captureData = {
        selectElementId: this.currentSelectedNode.data().id,
        selectElementCdata: md.render(this.currentSelectedNode.data().cdata),
        selectElementRawCdata: this.currentSelectedNode.data().cdata
      }
    } else {
      this.captureData = {
        selectElementId: this.currentSelectedNode.data().id,
        selectElementCdata: "",
        selectElementRawCdata: this.currentSelectedNode.data().cdata
      }
    }
    this._lockedElement = this.currentSelectedNode.locked()
  }

  onLeftClickEdge(event: any): void {
    this.logger.info('[EDGE] lclick', event)
    this.selectorDisplay = this.base16.decode(event.target.id())
    this.messageService.add({
      severity: 'info', summary: `Select edge ${event.target.data().label}`, detail: `${this.base16.decode(event.target.id())}`
    });
    this.currentSelectedNode = undefined
    this.currentSelectedEdge = event.target[0]
    // Any documentation
    if (this.currentSelectedEdge.data().cdata) {
      this.captureData = {
        selectElementId: this.currentSelectedEdge.data().id,
        selectElementCdata: md.render(this.currentSelectedEdge.data().cdata),
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
    captureData.selectElementCdata = md.render(captureData.selectElementRawCdata)
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

  retrieveStyle(): any[] {
    let tags = this.graphsService.getAllTags();

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
            let alias = element.data().alias ? '...' : ''
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

  onSelect(item: any): void {
    let anims = [
      { "opacity": 0.2 },
      { "opacity": 1 }
    ]
    if (item._source) {
      this.animate(this.cy?.$(`#${item._source}`), anims)
      this.animate(this.cy?.$(`#${item._target}`), anims)
    } else {
      this.animate(this.cy?.$(`#${item._id}`), anims)
    }
  }

  animate(searchedId: any, styles: any[]): void {
    if (searchedId) {
      if (searchedId.length > 0) {
        let _item = searchedId[0]
        let fns = _.map(styles, (style) => {
          return () => {
            _item
              .animate({
                style: style
              }, {
                duration: 250
              })
          }
        })
        _.each(fns, (fn) => fn())
      }
    }
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

  toSysGraph(_id: string, _label: string): SysGraph {
    let index: any = {}
    return {
      id: _id,
      label: _label,
      nodes: _.map(this.cy?.nodes(), (node) => {
        let _node: SysNode = {
          // Clone data can override the original id
          id: node.data()['clone'] || node.data()['id'] || "",
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

  gexf(_id: string, _label: string): void {
    let _graph: SysGraph = this.toSysGraph(_id, _label)
    this.clipboardService.copyTextToClipboard(this.graphsService.toGexf(_graph).join('\n'))
  }

  graphml(_id: string, _label: string): void {
    let _graph: SysGraph = this.toSysGraph(_id, _label)
    this.clipboardService.copyTextToClipboard(this.graphsService.toGraphml(_graph).join('\n'))
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

