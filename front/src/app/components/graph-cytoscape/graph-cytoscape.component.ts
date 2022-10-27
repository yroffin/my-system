import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { SysEdge, SysGraph, SysNode } from 'src/app/models/graph';
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
export class GraphCytoscapeComponent implements OnInit, AfterViewInit {

  displaySelection: boolean = false;
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
            full: true
          }) || ""
          this.myPng?.nativeElement.setAttribute('src', png);
        }
        this.displayExportPng = true
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
      label: 'Add node',
      tooltipOptions: {
        tooltipLabel: "Add node",
        tooltipPosition: 'right',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "assets/dock/node.png",
      command: () => {
        this.captureData = {
          id: _.uniqueId("default"),
          label: "default",
          cdata: "",
          tag: "",
          group: "",
          edge: "",
          isTarget: false,
          tags: _.sortedUniqBy(_.map(this.cy?.nodes(), (node) => {
            return {
              name: node.data().tag,
              code: node.data().id
            }
          }), (node) => {
            return node.name
          }),
          edges: _.sortedUniqBy(_.map(this.cy?.nodes(), (node) => {
            return {
              name: this.base16.decode(node.data().id),
              code: node.data().id
            }
          }), (node) => {
            return node.name
          }),
          parent: undefined
        }
        this.displayAddNewNode = true
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

  selectElementCdata: string | undefined
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
  subscription: any = null;

  preferences: SysPreference

  cy?: Core
  boxSelectionEnabled?: boolean
  displayExportPng = false
  displayAddNewNode = false
  displayTool = true

  searchNode = ""
  graphs: TreeNode[] = [];
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

    this.graph$.subscribe(graph => {
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

        this.cy?.add(_.map(graph.nodes, (node) => {
          let _node: any = {
            data: {
              id: node.id,
              label: node.label,
              cdata: node.cdata,
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
    })

    this.tags$.subscribe(_tags => {
      if (!_tags) {
        return
      }
      this.tags = JSON.stringify(_tags, null, 2)
      this.cy?.style(this.retrieveStyle())
    })
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
      label: 'Clone',
      command: () => {
        this.onCloneNode(this.currentSelectedNode)
        this.onClearAnySelection()
      }
    },
    {
      label: 'Info',
      command: () => {
        this.displaySelection = true;
        this.onClearAnySelection()
      }
    },
    {
      label: 'Documentation',
      command: () => {
        this.displayMarkdown = true;
        this.onClearAnySelection()
      }
    },
    {
      label: 'Link to another node',
      command: () => {
        this.edgehandles.start(this.currentSelectedNode)
        this.onClearAnySelection()
      }
    }
  ];

  edgeItem = [
    {
      label: 'Clone',
      command: () => {
        this.onClearAnySelection()
      }
    },
    {
      label: 'Info',
      command: () => {
        this.displaySelection = true;
        this.onClearAnySelection()
      }
    },
    {
      label: 'Documentation',
      command: () => {
        this.displayMarkdown = true;
        this.onClearAnySelection()
      }
    }
  ];

  coreItem = [
    {
      label: 'Group',
      items: [
        {
          label: 'Toggle',
          command: () => {
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
        }
      ]
    },
    {
      label: 'Layout',
      items: [
        {
          label: 'Bread First Layout',
          command: () => {
            if (this.breadFirstLayoutOptions) {
              this.cy?.layout(this.breadFirstLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
        },
        {
          label: 'Concentric Layout',
          command: () => {
            if (this.concentricLayoutOptions) {
              this.cy?.layout(this.concentricLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
        },
        {
          label: 'Circle Layout',
          command: () => {
            if (this.circleLayoutOptions) {
              this.cy?.layout(this.circleLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
        },
        {
          label: 'Grid Layout',
          command: () => {
            if (this.gridLayoutOptions) {
              this.cy?.layout(this.gridLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
        },
        {
          label: 'Cose Layout',
          command: () => {
            if (this.coseLayoutOptions) {
              this.cy?.layout(this.coseLayoutOptions).run()
            }
            this.onClearAnySelection()
          }
        },
        {
          label: 'Dagre Layout',
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
      items: [
        {
          label: '0.1',
          command: () => {
            this.cy?.zoom(0.1)
          }
        },
        {
          label: '0.2',
          command: () => {
            this.cy?.zoom(0.2)
          }
        },
        {
          label: '0.3',
          command: () => {
            this.cy?.zoom(0.3)
          }
        },
        {
          label: '0.5',
          command: () => {
            this.cy?.zoom(0.5)
          }
        },
        {
          label: '0.6',
          command: () => {
            this.cy?.zoom(0.6)
          }
        },
        {
          label: '0.75',
          command: () => {
            this.cy?.zoom(0.75)
          }
        },
        {
          label: '1',
          command: () => {
            this.cy?.zoom(1)
          }
        }
      ]
    },
    {
      label: 'Draw mode',
      items: [
        {
          label: 'Toggle',
          command: () => {
            if (this.drawModeEnabled) {
              this.edgehandles.disableDrawMode()
              this.drawModeEnabled = false;
            } else {
              this.edgehandles.enableDrawMode()
              this.drawModeEnabled = true;
            }
            this.onClearAnySelection()
          }
        }
      ]
    }
  ];

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  captureData: any = {}
  createNewNode(): void {
    this.displayAddNewNode = false

    this.cy?.add([{
      data: {
        id: this.base16.encode(this.captureData.id),
        label: this.captureData.label,
        cdata: this.captureData.cdata,
        tag: this.captureData.tag.name
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
    this.selectElementCdata = ""
    this.currentSelectedEdge = undefined
    this.currentSelectedNode = event.target[0]
    // Any documentation
    if (this.currentSelectedNode.data().cdata) {
      this.selectElementCdata = md.render(this.currentSelectedNode.data().cdata)
    }
    this._lockedElement = this.currentSelectedNode.locked()
  }

  onLeftClickEdge(event: any): void {
    this.logger.info('[EDGE] lclick', event)
    this.selectorDisplay = this.base16.decode(event.target.id())
    this.messageService.add({
      severity: 'info', summary: `Select edge ${event.target.data().label}`, detail: `${this.base16.decode(event.target.id())}`
    });
    this.selectElementCdata = ""
    this.currentSelectedNode = undefined
    this.currentSelectedEdge = event.target[0]
    // Any documentation
    if (this.currentSelectedEdge.data().cdata) {
      this.selectElementCdata = md.render(this.currentSelectedEdge.data().cdata)
    }
  }

  onCloneNode(nodes: any): void {
    if (nodes.length === 1 && nodes[0].isNode()) {
      this.cy?.add(_.map(nodes, (node) => {
        let id = `${this.base16.decode(node.data()?.id)}@${uuidv4()}`
        let _node: any = {
          data: {
            id: this.base16.encode(id),
            label: node.data()?.label,
            group: "",
            tag: node.data()?.tag
          },
          position: {
            x: node.position.x,
            y: node.position.y
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
        styleCss.push({
          selector: `${tag.selector}`,
          css: tag.style?.css ? tag.style?.css : {}
        })
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

  toSysGraph(_id: string, _label: string): SysGraph {
    let index: any = {}
    return {
      id: _id,
      label: _label,
      nodes: _.map(this.cy?.nodes(), (node) => {
        let _node: SysNode = {
          id: node.data()['id'] || "",
          label: node.data()['label'] || "",
          x: node.position().x || 0,
          y: node.position().y || 0,
          size: 10,
          color: "0",
          group: node.data()['group'],
          tag: node.data()['tag']
        }
        index[node.data()['id'] || ""] = _node
        if (node.data()['cdata']) {
          _node.cdata = node.data()['cdata']
        }
        if (node.data()['parent']) {
          _node.parent = node.data()['parent']
        }
        return _node
      }),
      edges: _.map(this.cy?.edges(), (edge) => {
        let source = edge.data().source
        let target = edge.data().target
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
}

