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
  renderer?: Core;

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
            name: node.label
          }
        })
      })
      _.each(graphs[0].edges, (edge) => {
        this.graph.edges.push({
          data: {
            id: edge.uid,
            name: edge.label,
            source: edge.source.uid,
            target: edge.target.uid
          }
        })
      })
      this.renderer?.add(this.graph)
      this.makeLayout({
      })
    })
  }

  ngOnInit(): void {
    this.graphsService
      .getGraphs("Default")
      .subscribe((graphs) => {
        this.store.dispatch(retrievedGraphList({ graphs }))
      });
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.renderer = cy({
      container: this.myGraph?.nativeElement,
      layout: { name: 'preset' },
      motionBlur: true,
      selectionType: 'single',
      boxSelectionEnabled: false
    });
  }

  makeLayout(opts: any) {
    cy.use(popper)
    let params: any = {
      name: 'popper',
      nodeSpacing: 5,
      edgeLengthVal: 45,
      animate: true,
      randomize: false,
      maxSimulationTime: 1500,
      avoidOverlap: true,
      edgeLength: (e: any) => { return params.edgeLengthVal / e.data('weight'); }
    }

    for (var i in opts) {
      params[i] = opts[i];
    }

    return this.renderer?.layout(params);
  }
}

