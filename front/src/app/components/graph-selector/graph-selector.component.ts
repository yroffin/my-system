import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { FilterService } from 'primeng/api';
import { SysGraph } from 'src/app/models/graph';
import { GraphService } from 'src/app/services/graph.service';
import { retrievedGraphList } from 'src/app/stats/graph.actions';
import { selectGraphs } from 'src/app/stats/graph.selectors';

@Component({
  selector: 'app-graph-selector',
  templateUrl: './graph-selector.component.html',
  styleUrls: ['./graph-selector.component.css']
})
export class GraphSelectorComponent implements OnInit {

  graphs: Array<SysGraph> = [];

  Delete = "false";

  graphs$ = this.store.select(selectGraphs);

  constructor(private graphsService: GraphService, private filterService: FilterService,
    private store: Store) {
    this.graphs$.subscribe(_graphs => {
      if (!_graphs || _graphs.length === 0) {
        return
      }
      this.graphs = [];
      _.each(_graphs, (graph) => {
        this.graphs.push(graph)
      })
    })
  }

  ngOnInit(): void {
    this.graphsService
      .getHeadGraphs("Default")
      .subscribe((graphs) => {
        this.store.dispatch(retrievedGraphList({ graphs }))
      });
  }

  deleteSelectedGraph(): void {

  }

  openNew(): void {

  }

}
