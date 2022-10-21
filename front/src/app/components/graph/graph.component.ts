import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import Graph from 'graphology';
import ForceSupervisor from "graphology-layout-force/worker";
import noverlap from 'graphology-layout-noverlap';
import forceAtlas2 from "graphology-layout-forceatlas2";
import Sigma from 'sigma';
import { GraphService } from 'src/app/services/graph.service';
import { selectGraphs } from 'src/app/stats/graph.selectors';
import * as _ from 'lodash';
import { retrievedGraphList } from 'src/app/stats/graph.actions';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('myGraph') myGraph?: ElementRef;
  subscription: any = null;
  graph: Graph = new Graph();
  renderer?: Sigma;

  display = false;
  xml: Array<string> = [];

  graphs$ = this.store.select(selectGraphs);

  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
    private graphsService: GraphService,
    private store: Store) {
    this.graphs$.subscribe(graphs => {
      if (!graphs || graphs.length === 0) {
        return
      }
      this.graph.clear();
      _.each(graphs[0].nodes, (node) => {
        this.graph.addNode(node.id, {
          x: node.x,
          y: node.y,
          label: node.label,
          color: node.color,
          size: node.size,
          uid: node.id
        });
      })
      _.each(graphs[0].edges, (edge) => {
        if (edge.source && edge.target) {
          this.graph.addEdge(edge.source, edge.target, {
            label: edge.label,
            type: "arrow",
            size: 5,
            uid: edge.id,
            source: edge.source,
            target: edge.target
          });
        } else {
          this.logger.info(edge)
        }
      })
      // Create the spring layout and start it
      const layout = new ForceSupervisor(this.graph, {
        isNodeFixed: (_, attr) => attr['highlighted']
      });
      // layout.start();
    })
  }

  ngOnInit(): void {
    let graphs = this.graphsService.getGraphs("Default")
    this.store.dispatch(retrievedGraphList({ graphs }))
  }

  ngAfterViewInit(): void {
    // State for drag'n'drop
    let draggedNode: string | null = null;
    let isDragging = false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.renderer = new Sigma(this.graph, this.myGraph?.nativeElement, {
      renderEdgeLabels: true
    });

    // On mouse down on a node
    //  - we enable the drag mode
    //  - save in the dragged node in the state
    //  - highlight the node
    //  - disable the camera so its state is not updated
    this.renderer.on("downNode", (e) => {
      isDragging = true;
      draggedNode = e.node;
      this.graph.setNodeAttribute(draggedNode, "highlighted", true);
    });

    // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
    this.renderer.getMouseCaptor().on("mousemovebody", (e) => {
      if (!isDragging || !draggedNode || !this.renderer) return;

      // Get new position of node
      const pos = this.renderer.viewportToGraph(e);

      this.graph.setNodeAttribute(draggedNode, "x", pos.x);
      this.graph.setNodeAttribute(draggedNode, "y", pos.y);

      // Prevent sigma to move camera:
      e.preventSigmaDefault();
      e.original.preventDefault();
      e.original.stopPropagation();
    });

    // On mouse up, we reset the autoscale and the dragging mode
    this.renderer.getMouseCaptor().on("mouseup", () => {
      if (draggedNode) {
        this.graph.removeNodeAttribute(draggedNode, "highlighted");
      }
      isDragging = false;
      draggedNode = null;
    });

    // Disable the autoscale at the first down interaction
    this.renderer.getMouseCaptor().on("mousedown", () => {
      if (!this.renderer?.getCustomBBox()) this.renderer?.setCustomBBox(this.renderer.getBBox());
    });
  }

  gexf(): void {
    this.xml = []
    this.xml.push(`<?xml version="1.0" encoding="UTF-8"?>`);
    this.xml.push(`<gexf xmlns="http://gexf.net/1.2" version="1.2">`);
    this.xml.push(`<meta lastmodifieddate="2009-03-20">`);
    this.xml.push(`<creator>Gexf.net</creator>`);
    this.xml.push(`<description>A hello world! file</description>`);
    this.xml.push(`</meta>`);
    this.xml.push(`<graph mode="static" defaultedgetype="directed">`);
    this.xml.push(`<nodes>`);
    this.graph.forEachNode(node => {
      let uid = this.graph.getNodeAttribute(node, 'uid');
      let label = this.graph.getNodeAttribute(node, 'label');
      let x = this.graph.getNodeAttribute(node, 'x');
      let y = this.graph.getNodeAttribute(node, 'y');
      this.xml.push(`<node id="${uid}" label="${label}" x="${x}" y="${y}" />`);
    });
    this.xml.push(`</nodes>`);
    this.xml.push(`<edges>`);
    this.graph.forEachEdge(edge => {
      let uid = this.graph.getEdgeAttribute(edge, 'uid');
      let label = this.graph.getEdgeAttribute(edge, 'label');
      let source = this.graph.getEdgeAttribute(edge, 'source');
      let target = this.graph.getEdgeAttribute(edge, 'target');
      this.xml.push(`<edge id="${uid}" source="${source}" target="${target}" label="${label}" />`);
    });
    this.xml.push(`</edges>`);
    this.xml.push(`</graph>`);
    this.xml.push(`</gexf>`);
    this.display = true;
  }

  uploadHandler(event: any): void {

    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
      let data = reader.result;
    });
    reader.readAsText(event.files[0])

  }

  @HostListener('window:beforeunload', ['$event'])
  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe()
    }
  }
}

