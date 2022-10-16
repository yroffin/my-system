import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { GraphService } from 'src/app/services/graph.service';
import { retrievedGraph, retrievedGraphList } from 'src/app/stats/graph.actions';
import { selectGraph, selectGraphs } from 'src/app/stats/graph.selectors';

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

var snapToGrid = require('cytoscape-snap-to-grid');
snapToGrid(cy); // register extension

import { BreadthFirstLayoutOptionsImpl, CircleLayoutOptionsImpl, ConcentricLayoutOptionsImpl, CoseLayoutOptionsImpl, DagreLayoutOptionsImpl, GridLayoutOptionsImpl } from './layout-options-impl';
import { style } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { SysEdge, SysGraph, SysNode } from 'src/app/models/graph';
import { MenuItem, Message, MessageService, TreeNode } from 'primeng/api';
import { Base16Service } from 'src/app/services/base16.service';
import { LogService } from 'src/app/services/log.service';
import { TreeTable } from 'primeng/treetable';

declare var cytoscape: any

@Component({
  selector: 'app-graph-cytoscape',
  templateUrl: './graph-cytoscape.component.html',
  styleUrls: ['./graph-cytoscape.component.css']
})
export class GraphCytoscapeComponent implements OnInit, AfterViewInit {

  @ViewChild('myCytoscape') myGraph?: ElementRef;
  @ViewChild('myPng') myPng?: ElementRef;
  @ViewChild('myTreeTable') myTreeTable?: TreeTable;
  subscription: any = null;

  cy?: Core
  boxSelectionEnabled?: boolean
  displayExportPng = false
  msgs: Message[] = []

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

  graph$ = this.store.select(selectGraph);
  graphs$ = this.store.select(selectGraphs);

  _lockedElement: boolean = false;
  _selectElement: any;
  _selectElementCdata: string = "";

  constructor(
    private graphsService: GraphService,
    private clipboardService: ClipboardService,
    private logger: LogService,
    private messageService: MessageService,
    private base16: Base16Service,
    private store: Store, private route: ActivatedRoute) {
    this.graph$.subscribe(graph => {
      if (!graph) {
        return
      }
      // refresh render
      this.cy?.startBatch()
      this.cy?.boxSelectionEnabled(this.boxSelectionEnabled)
      this.cy?.nodes().remove()
      this.cy?.edges().remove()
      if (graph.nodes) {

        this.graphs =
          [
            {
              "label": "Nodes",
              "data": {
                uid: 1,
                label: "Nodes"
              },
              "expandedIcon": "pi pi-folder-open",
              "collapsedIcon": "pi pi-folder",
              "children": _.map(graph.nodes, (node) => {
                return {
                  "label": "Node",
                  "data": {
                    _id: node.id,
                    label: node.label
                  },
                  "expandedIcon": "pi pi-folder-open",
                  "collapsedIcon": "pi pi-folder",
                  "children": []
                }
              })
            },
            {
              "label": "Edges",
              "data": {
                uid: 1,
                label: "Edges"
              },
              "expandedIcon": "pi pi-folder-open",
              "collapsedIcon": "pi pi-folder",
              "children": _.map(graph.edges, (edge) => {
                return {
                  "label": "Edge",
                  "data": {
                    _id: edge.id,
                    _source: edge.source,
                    _target: edge.target,
                    label: edge.label
                  },
                  "expandedIcon": "pi pi-folder-open",
                  "collapsedIcon": "pi pi-folder",
                  "children": []
                }
              })
            }
          ]

        this.myTreeTable?.filter("sample", "label", undefined)
        this.cy?.add(_.map(graph.nodes, (node) => {
          let _node: any = {
            data: {
              id: node.id,
              label: node.label,
              cdata: node.cdata,
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
        this.cy?.add(_.map(graph.edges, (edge) => {
          let _edge = {
            data: {
              id: edge.id,
              label: edge.label,
              cdata: edge.cdata,
              source: edge.source || "",
              target: edge.target || "",
              tag: edge.tag
            }
          }
          return _edge
        }))
      }
      this.cy?.endBatch()
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.items = [
      {
        label: 'Export',
        items: [{
          label: 'Clipboard',
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
          label: 'Export PNG',
          command: () => {
            // put the png data in an img tag
            if (document) {
              let png = this.cy?.png() || ""
              this.myPng?.nativeElement.setAttribute('src', png);
            }
            this.displayExportPng = true
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
            }
          },
          {
            label: 'Concentric Layout',
            command: () => {
              if (this.concentricLayoutOptions) {
                this.cy?.layout(this.concentricLayoutOptions).run()
              }
            }
          },
          {
            label: 'Circle Layout',
            command: () => {
              if (this.circleLayoutOptions) {
                this.cy?.layout(this.circleLayoutOptions).run()
              }
            }
          },
          {
            label: 'Grid Layout',
            command: () => {
              if (this.gridLayoutOptions) {
                this.cy?.layout(this.gridLayoutOptions).run()
              }
            }
          },
          {
            label: 'Cose Layout',
            command: () => {
              if (this.coseLayoutOptions) {
                this.cy?.layout(this.coseLayoutOptions).run()
              }
            }
          },
          {
            label: 'Dagre Layout',
            command: () => {
              if (this.dagreLayoutOptions) {
                this.cy?.layout(this.dagreLayoutOptions).run()
              }
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
            label: '0.5',
            command: () => {
              this.cy?.zoom(0.5)
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
        label: 'Grid',
        items: [
          {
            label: 'Snap to grid',
            command: () => {
              let myCy: any = this.cy
              myCy?.snapToGrid()
            }
          }
        ]
      }
    ];
  }

  ngAfterViewInit(): void {
    let tags = this.graphsService.getAllTags();

    let styleCss: Array<any> = []
    _.each(tags, (tag) => {
      if (tag.selector === null) {
        return
      }
      styleCss.push({
        selector: `${tag.selector}[tag = '${tag.label}']`,
        css: tag.style?.css ? tag.style?.css : {}
      })
    })

    let allstyles = []
    allstyles.push({
      selector: "node",
      css: {
        content: "data(label)",
        shape: "ellipse",
        height: "40px",
        width: "40px",
        'background-color': 'white',
        "background-fit": 'cover cover',
        "text-border-color": "white",
        "text-outline-color": "grey",
        "text-outline-width": "1px",
        "ghost": "yes",
        "ghost-offset-x": "15px",
        "ghost-offset-y": "15px",
        "ghost-opacity": "0.1"
      }
    });
    allstyles.push({
      selector: "edge",
      css: {
        content: "data(label)",
        "target-arrow-shape": "triangle",
        'width': "5px",
        'line-color': 'black',
        'target-arrow-color': 'black',
        'text-margin-x': -20,
        'text-margin-y': -20,
        "curve-style": "unbundled-bezier",
        "control-point-distances": 50,
        "control-point-weights": 0.5
      }
    });
    _.each(styleCss, (style) => {
      allstyles.push(style)
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.cy = cy({
      container: this.myGraph?.nativeElement,
      layout: { name: 'preset' },
      motionBlur: true,
      selectionType: 'single',
      boxSelectionEnabled: false,
      style: allstyles,
    });

    this.cy.on('select', 'node', (event) => {
      this.logger.log(event)
      this.onSelectElement(event)
    });

    this.cy.on('select', 'edge', (event) => {
      this.logger.log(event)
      this.onSelectElement(event)
    });

    this.cy.on('select', (event) => {
      this.logger.log(event)
    });

    this.route.params.subscribe(params => {
      this.id = params['label'];

      let _graph = this.graphsService.getGraph(this.id + "")
      if (_graph) {
        this.store.dispatch(retrievedGraph({ graph: _graph }))
      }
    });
  }

  private onSelectElement(event: any) {
    this._selectElement = {
      data: JSON.parse(JSON.stringify(event.target.data())),
      locked: event.target.locked()
    }
    if (this._selectElement.data.cdata) {
      this._selectElementCdata = md.render(this._selectElement.data.cdata)
    } else {
      this._selectElementCdata = ""
    }
    this._selectElement.data.id = this.base16.decode(this._selectElement.data.id)
    if (this._selectElement.data.parent) {
      this._selectElement.data.parent = this.base16.decode(this._selectElement.data.parent)
    }
    if (this._selectElement.data.source) {
      this._selectElement.data.source = this.base16.decode(this._selectElement.data.source)
    }
    if (this._selectElement.data.target) {
      this._selectElement.data.target = this.base16.decode(this._selectElement.data.target)
    }
    this._lockedElement = event.target.locked()
  };


  onSelect(item: any): void {
    this.logger.log(item)
    let anims = [
      {
        x: 32, y: 32
      },
      {
        x: 0, y: 0
      }
    ]
    if (item._source) {
      this.animate(this.cy?.$(`#${item._source}`), anims)
      this.animate(this.cy?.$(`#${item._target}`), anims)
    } else {
      this.animate(this.cy?.$(`#${item._id}`), anims)
    }
  }

  animate(searchedId: any, positions: any[]): void {
    if (searchedId) {
      if (searchedId.length > 0) {
        let _item = searchedId[0]
        this.logger.log(_item)
        let paths: Position[] = _.map(positions, (position) => {
          return {
            x: _item.position().x + position.x,
            y: _item.position().y + position.y
          }
        })
        let fns = _.map(paths, (path) => {
          return () => {
            _item
              .animate({
                position: path
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
    if (!this._selectElement) {
      return
    }
    let _item = this.cy?.$(`#${this.base16.encode(this._selectElement.data.id)}`)
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

  gexf(_id: string, _label: string): void {
    let index: any = {}
    let _graph: SysGraph = {
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
    this.clipboardService.copyTextToClipboard(this.graphsService.toGexf(_graph).join('\n'))
  }
}

