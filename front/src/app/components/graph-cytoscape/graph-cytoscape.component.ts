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
import { SysGraphService } from 'src/app/models/graph';

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

  graph: ElementsDefinition = {
    nodes: [],
    edges: []
  }
  graph$ = this.store.select(selectGraph);
  graphs$ = this.store.select(selectGraphs);

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
          }
        })
      })
      _.each(graph.edges, (edge) => {
        this.graph.edges.push({
          data: {
            id: edge.uid,
            label: edge.label,
            source: edge.source.uid,
            target: edge.target.uid,
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
      if (this.layoutOptions) {
        this.cy?.layout(this.layoutOptions).run()
      }
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngAfterViewInit(): void {
    this.graphsService
      .getAllTags()
      .subscribe((tags) => {
        let styleCss = _.map(tags, (tag) => {
          return {
            selector: `${tag.selector}[tag = '${tag.label}']`,
            css: tag.style?.css ? tag.style?.css : {}
          }
        })

        let allstyles = []
        allstyles.push({
          selector: "node",
          css: {
            content: "data(label)",
            height: "40px",
            width: "40px",
            'background-color': 'blue'
          }
        });
        allstyles.push({
          selector: "edge",
          css: {
            content: "data(label)",
            "target-arrow-shape": "triangle",
            'width': "5px",
            'color': 'blue'
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
    this.graphsService
      .getGraph("47")
      .subscribe((graph) => {
        this.clipboardService.copyTextToClipboard(SysGraphService.gexf(graph).join('\n'))
      });
  }
}

