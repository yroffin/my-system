import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { FilterService } from 'primeng/api';
import { SysGraph, SysGraphService } from 'src/app/models/graph';
import { ClipboardService } from 'src/app/services/clipboard.service';
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

  constructor(private http: HttpClient, private router: Router, private graphsService: GraphService, private clipboardService: ClipboardService,
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
    this.graphsService
      .getHeadGraphs()
      .subscribe((graphs) => {
        this.store.dispatch(retrievedGraphList({ graphs }))
      });
  }

  deleteSelectedGraph(): void {

  }

  openNew(): void {

  }

  uploadHandler(event: any, _graph: SysGraph): void {
    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
      let data: any = reader.result;
      this.graphsService.uploadgraph(_graph.id + "", data)
        .subscribe(graph => {
          console.log(`Graph ${graph.id} loaded`)
        });
    });
    reader.readAsText(event.files[0])
  }

  gexf(_graph: SysGraph): void {
    this.graphsService
      .getGraph(_graph.id + "")
      .subscribe((graph) => {
        this.clipboardService.copyTextToClipboard(SysGraphService.gexf(graph).join('\n'))
      });
  }

  select(_graph: SysGraph): void {
    this.router.navigate(['graph', 'cytoscape', _graph.id])
  }
}
