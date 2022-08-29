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
import { CoseLayoutOptionsImpl } from './layout-options-impl';
import { style } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { SysEdge, SysGraph, SysGraphService, SysNode } from 'src/app/models/graph';
import { MenuItem } from 'primeng/api';

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
  layoutOptions?: LayoutOptions = new CoseLayoutOptionsImpl()
  id?: string
  items: MenuItem[] = [];

  graph: ElementsDefinition = {
    nodes: [],
    edges: []
  }
  graph$ = this.store.select(selectGraph);
  graphs$ = this.store.select(selectGraphs);

  _selectNode: any;
  _selectEdge: any;

  constructor(private http: HttpClient, private graphsService: GraphService, private clipboardService: ClipboardService,
    private store: Store, private route: ActivatedRoute) {
    this.graph$.subscribe(graph => {
      if (!graph) {
        return
      }
      _.each(graph.nodes, (node) => {
        this.graph.nodes.push({
          data: {
            id: node.uid,
            label: node.label,
            tag: node.tag
          },
          position: {
            x: node.x,
            y: node.y
          }
        })
      })
      _.each(graph.edges, (edge) => {
        this.graph.edges.push({
          data: {
            id: edge.uid,
            label: edge.label,
            source: edge.source?.uid || "",
            target: edge.target?.uid || "",
            tag: edge.tag
          }
        })
      })

      // refresh render
      this.cy?.startBatch()
      this.cy?.boxSelectionEnabled(this.boxSelectionEnabled)
      this.cy?.nodes().remove()
      this.cy?.edges().remove()
      if (this.graph.nodes) {
        this.cy?.add(this.graph.nodes)
      }
      if (this.graph.edges) {
        this.cy?.add(this.graph.edges)
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
          this.gexf()
        }
      },
      {
        label: 'Organize',
        command: () => {
          if (this.layoutOptions) {
            this.cy?.layout(this.layoutOptions).run()
          }
        }
      }
    ];
  }

  ngAfterViewInit(): void {
    this.graphsService
      .getAllTags()
      .subscribe((tags) => {
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
            'background-color': 'blue',
            "text-border-color": "white",
            "text-outline-color": "grey",
            "text-outline-width": "1px",
            "ghost": "yes",
            "ghost-offset-x": "2px",
            "ghost-offset-y": "2px",
            "ghost-opacity": "1",
            "background-image": "https://th.bing.com/th/id/R.e7d5f8cd88607764828c1f0b6c21db39?rik=kW8biKqCrwK4PA&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2015%2f02%2fmario-128x128-icon_245367.png&ehk=az2t7m19lsF1oSICVeaXDLuu2Y%2bSJQQ5Uy2dI2g9TtM%3d&risl=&pid=ImgRaw&r=0"
          }
        });
        allstyles.push({
          selector: "edge",
          css: {
            content: "data(label)",
            "mid-target-arrow-shape": "triangle",
            'width': "5px",
            'mid-target-arrow-color': 'blue',
            "curve-style": "taxi",
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
            data: event.target.data()
          }
        });

        this.cy.on('select', 'edge', (event) => {
          this._selectEdge = {
            data: event.target.data()
          }
        });

        this.route.params.subscribe(params => {
          this.id = params['id'];

          this.graphsService
            .getGraph(this.id + "")
            .subscribe((graph) => {
              this.store.dispatch(retrievedGraph({ graph }))
            });
        });

      })
  }

  gexf(): void {
    let index: any = {}
    let _graph: SysGraph = {
      nodes: _.map(this.graph.nodes, (node) => {
        let x = node.position?.x;
        let y = node.position?.y;
        let _node: SysNode = {
          id: node.data['id'] || "",
          label: node.data['label'] || "",
          x: node.position?.x || 0,
          y: node.position?.y || 0,
          size: 10,
          color: "0",
          tag: node.data['tag'],
          uid: node.data['id'] || ""
        }
        index[node.data['id'] || ""] = _node
        return _node
      }),
      edges: _.map(this.graph.edges, (edge) => {
        let source = edge.data['source'] || ""
        let target = edge.data['target'] || ""
        let _edge: SysEdge = {
          id: edge.data['id'] || "",
          label: edge.data['label'] || "",
          source: index[source],
          target: index[target],
          tag: edge.data['tag'],
          uid: edge.data['id'] || ""
        }
        return _edge
      })
    }
    console.log(_graph)
    this.clipboardService.copyTextToClipboard(SysGraphService.gexf(_graph).join('\n'))
  }
}

