import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { GraphService } from 'src/app/services/graph.service';
import { retrievedGraph, retrievedGraphList } from 'src/app/stats/graph.actions';
import { selectGraph, selectGraphs } from 'src/app/stats/graph.selectors';

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
import { CoseLayoutOptionsImpl, DagreLayoutOptionsImpl } from './layout-options-impl';
import { style } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { SysEdge, SysGraph, SysNode } from 'src/app/models/graph';
import { MenuItem } from 'primeng/api';
import { Base16Service } from 'src/app/services/base16.service';

declare var cytoscape: any

@Component({
  selector: 'app-graph-cytoscape',
  templateUrl: './graph-cytoscape.component.html',
  styleUrls: ['./graph-cytoscape.component.css']
})
export class GraphCytoscapeComponent implements OnInit, AfterViewInit {

  @ViewChild('myCytoscape') myGraph?: ElementRef;
  subscription: any = null;

  cy?: Core
  boxSelectionEnabled?: boolean

  coseLayoutOptions?: LayoutOptions = new CoseLayoutOptionsImpl()
  dagreLayoutOptions?: LayoutOptions = new DagreLayoutOptionsImpl()

  id?: string
  items: MenuItem[] = [];

  graph$ = this.store.select(selectGraph);
  graphs$ = this.store.select(selectGraphs);

  _lockedNode: boolean = false;
  _selectNode: any;
  _lockedEdge: boolean = false;
  _selectEdge: any;

  constructor(
    private graphsService: GraphService,
    private clipboardService: ClipboardService,
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
        this.cy?.add(_.map(graph.nodes, (node) => {
          let _node: any = {
            data: {
              id: node.id,
              label: node.label,
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
        label: 'Copy',
        command: () => {
          if (this.id) {
            this.gexf(this.id, this.id)
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
      this._selectNode = {
        data: JSON.parse(JSON.stringify(event.target.data())),
        locked: event.target.locked()
      }
      this._selectNode.data.id = this.base16.decode(this._selectNode.data.id)
      if (this._selectNode.data.parent) {
        this._selectNode.data.parent = this.base16.decode(this._selectNode.data.parent)
      }
      this._lockedNode = event.target.locked()
    });

    this.cy.on('select', 'edge', (event) => {
      this._selectEdge = {
        data: JSON.parse(JSON.stringify(event.target.data())),
        locked: event.target.locked()
      }
      this._selectEdge.data.id = this.base16.decode(this._selectEdge.data.id)
      if (this._selectEdge.data.source) {
        this._selectEdge.data.source = this.base16.decode(this._selectEdge.data.source)
      }
      if (this._selectEdge.data.target) {
        this._selectEdge.data.target = this.base16.decode(this._selectEdge.data.target)
      }
      this._lockedEdge = event.target.locked()
    });

    this.route.params.subscribe(params => {
      this.id = params['label'];

      let _graph = this.graphsService.getGraph(this.id + "")
      if (_graph) {
        this.store.dispatch(retrievedGraph({ graph: _graph }))
      }
    });
  }

  handleChangeLockNode(event: any): void {
    if (!this._selectNode) {
      return
    }
    let _item = this.cy?.$(`#${this._selectNode.data.id}`)
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

  handleChangeLockEdge(event: any): void {
    if (!this._selectEdge) {
      return
    }
    let _item = this.cy?.$(`#${this._selectEdge.data.id}`)
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
          tag: edge.data()['tag']
        }
        return _edge
      })
    }
    this.clipboardService.copyTextToClipboard(this.graphsService.toGexf(_graph).join('\n'))
  }
}

