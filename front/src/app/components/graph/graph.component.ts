import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import Graph from 'graphology';
import ForceSupervisor from "graphology-layout-force/worker";
import Sigma from 'sigma';
import { SysGraph, SysNode } from 'src/app/models/graph';
import { GraphService } from 'src/app/services/graph.service';
import { selectGraphs } from 'src/app/stats/graph.selectors';
import * as _ from 'lodash';
import { retrievedGraphList } from 'src/app/stats/graph.actions';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('myGraph') myGraph?: ElementRef;
  subscription: any = null;
  graph: Graph = new Graph();

  graphs$ = this.store.select(selectGraphs);

  constructor(private graphsService: GraphService,
    private store: Store) {
    this.graphs$.subscribe(graphs => {
      if (!graphs || graphs.length === 0) {
        return
      }
      this.graph.clear();
      _.each(graphs[0].nodes, (node) => {
        this.graph.addNode(node.id, { x: node.x, y: node.y, label: node.label, color: node.color, size: node.size });
      })
      _.each(graphs[0].edges, (edge) => {
        this.graph.addEdge(edge.source.id, edge.target.id, {
          label: edge.label,
          type: "arrow",
          size: 5
        });
      })
      // Create the spring layout and start it
      const layout = new ForceSupervisor(this.graph);
      layout.start();
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
    const renderer = new Sigma(this.graph, this.myGraph?.nativeElement, {
      renderEdgeLabels: true
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  ngOnDestroy() {
    console.log(`on destroy`)
    if (this.subscription != null) {
      this.subscription.unsubscribe()
    }
  }
}
