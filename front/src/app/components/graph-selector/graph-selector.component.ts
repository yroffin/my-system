import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { FilterService } from 'primeng/api';
import { SysGraph, SysGraphService } from 'src/app/models/graph';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { DatabaseService } from 'src/app/services/database.service';
import { GraphService } from 'src/app/services/graph.service';
import { retrievedGraphList } from 'src/app/stats/graph.actions';
import { selectGraph, selectGraphs } from 'src/app/stats/graph.selectors';

@Component({
  selector: 'app-graph-selector',
  templateUrl: './graph-selector.component.html',
  styleUrls: ['./graph-selector.component.css']
})
export class GraphSelectorComponent implements OnInit {

  graph?: SysGraph = undefined;
  graphs: Array<SysGraph> = [];

  Delete = "false";
  xml: Array<string> = [];

  graph$ = this.store.select(selectGraph);
  graphs$ = this.store.select(selectGraphs);

  constructor(
    private http: HttpClient,
    private router: Router,
    private graphsService: GraphService,
    private clipboardService: ClipboardService,
    private databaseService: DatabaseService,
    private store: Store) {
    this.graph$.subscribe(_graph => {
      if (!_graph) {
        return
      }
      this.graph = _graph
    })
    this.graphs$.subscribe(_graphs => {
      if (!_graphs) {
        return
      }
      this.graphs = _.map(_graphs, (graph) => {
        console.log(graph)
        return {
          id: graph.id,
          label: graph.label,
          nodes: graph.nodes,
          edges: graph.edges
        }
      });
    })
  }

  ngOnInit(): void {
    let graphs = this.databaseService.findAllGraphs()
    console.log(graphs)
    this.store.dispatch(retrievedGraphList({ graphs }))
  }

  deleteSelectedGraph(): void {

  }

  openNew(): void {
    this.databaseService.store({
      id: "default",
      label: "default",
      edges: [],
      nodes: []
    })
  }

  uploadHandler(event: any, _graph: SysGraph): void {
    let reader = new FileReader();
    reader.addEventListener("loadend", async () => {
      let data: any = reader.result;
      console.info(data)
      let loadedGraph = await this.graphsService.loadGraphGexf(_graph.id, data);
      console.info(loadedGraph)
      this.databaseService.store(loadedGraph)
    });
    reader.readAsText(event.files[0])
  }

  gexf(_graph: SysGraph): void {
    let graph = this.graphsService.getGraph(_graph.id + "")
    this.clipboardService.copyTextToClipboard(this.graphsService.toGexf(graph).join('\n'))
  }

  select(_graph: SysGraph): void {
    this.router.navigate(['graph', 'cytoscape', _graph.id])
  }
}
