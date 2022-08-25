import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { GraphService } from 'src/app/services/graph.service';
import { retrievedGraphList } from 'src/app/stats/graph.actions';
import { selectGraphs } from 'src/app/stats/graph.selectors';

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

declare var cytoscape: any

const cola = require('cytoscape-cola');
const popper = require('cytoscape-popper');

@Component({
  selector: 'app-graphd3',
  templateUrl: './graphd3.component.html',
  styleUrls: ['./graphd3.component.css']
})
export class Graphd3Component implements OnInit, AfterViewInit {

  @ViewChild('myGraph') myGraph?: ElementRef;
  subscription: any = null;

  cy?: Core
  boxSelectionEnabled?: boolean
  layoutOptions?: LayoutOptions = new CoseLayoutOptionsImpl()

  graph: ElementsDefinition = {
    nodes: [],
    edges: []
  }
  graphs$ = this.store.select(selectGraphs);

  constructor(private http: HttpClient, private graphsService: GraphService,
    private store: Store) {
    this.graphs$.subscribe(graphs => {
      if (!graphs || graphs.length === 0) {
        return
      }
      _.each(graphs[0].nodes, (node) => {
        this.graph.nodes.push({
          data: {
            id: node.uid,
            label: node.label,
            tag: node.tag
          }
        })
      })
      _.each(graphs[0].edges, (edge) => {
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

        this.graphsService
          .getGraphs("Default")
          .subscribe((graphs) => {
            this.store.dispatch(retrievedGraphList({ graphs }))
          });
      })

  }
}

