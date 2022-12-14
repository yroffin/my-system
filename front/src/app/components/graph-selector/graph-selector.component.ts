import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { SysGraph } from 'src/app/models/graph';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { GraphService } from 'src/app/services/graph.service';
import { NGXLogger } from 'ngx-logger';
import { retrievedGraphList } from 'src/app/stats/graph.actions';
import { selectGraph, selectGraphs } from 'src/app/stats/graph.selectors';

@Component({
  selector: 'app-graph-selector',
  templateUrl: './graph-selector.component.html',
  providers: [MessageService],
  styleUrls: ['./graph-selector.component.css']
})
export class GraphSelectorComponent implements OnInit {

  graph?: SysGraph = undefined;
  graphs: Array<SysGraph> = [];
  newGraph?: string

  displayImport = false
  selectedGraph?: SysGraph

  displayExport = false
  exportData: string[] = []
  exportDataHtml = ""

  Delete = "false";
  xml: Array<string> = [];

  graph$ = this.store.select(selectGraph);
  graphs$ = this.store.select(selectGraphs);

  constructor(
    private router: Router,
    private logger: NGXLogger,
    private graphsService: GraphService,
    private clipboardService: ClipboardService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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
        return {
          id: graph.id,
          style: graph.style,
          rules: graph.rules,
          label: graph.label,
          nodes: graph.nodes,
          edges: graph.edges
        }
      });
    })
  }

  ngOnInit(): void {
    let graphs = this.graphsService.findAll()
    this.store.dispatch(retrievedGraphList({ graphs }))
  }

  confirm(event: Event, _graph: SysGraph) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure that you want to proceed ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteGraph(_graph)
      },
      reject: () => {
      }
    });
  }

  deleteGraph(_graph: SysGraph): void {
    let graphs = this.graphsService.delete(_graph.id)
    this.store.dispatch(retrievedGraphList({ graphs }))
  }

  showImport(_graph: SysGraph) {
    this.displayImport = true;
    this.selectedGraph = _graph;
  }

  openNew(name?: string): void {
    if (name) {
      this.graphsService.store({
        id: name,
        style: "default",
        rules: "default",
        label: name,
        edges: [],
        nodes: []
      }, (entity) => {
        entity.style = "default"
        entity.rules = "default"
        entity.label = name
        entity.edges = []
        entity.nodes = []
      })
      let graphs = this.graphsService.findAll()
      this.store.dispatch(retrievedGraphList({ graphs }))
    }
  }

  uploadHandler(event: any, _graph?: SysGraph): void {
    if (_graph) {
      // Load this graph
      this.graphsService.uploadHandler(event.files[0], _graph.id, _graph.id).then((loaded) => {
        this.graphsService.store(loaded,
          (entity) => {
            entity.style = "default"
            entity.rules = "default"
            entity.label = loaded.label
            entity.edges = []
            entity.nodes = []
          })
        this.displayImport = false
      })
    }
  }

  gexf(_graph: SysGraph): void {
    let graph = this.graphsService.findOne(_graph.id + "")
    this.exportData = this.graphsService.toGexf(graph)
    this.exportDataHtml = this.exportData.join('\n')
    this.clipboardService.copyTextToClipboard(this.exportData.join('\n'))
    this.displayExport = true
  }

  selectCytoscape(_graph: SysGraph): void {
    this.router.navigate(['graphs', 'cytoscape', _graph.id])
  }

  selectThreejs(_graph: SysGraph): void {
    this.router.navigate(['graphs', 'threejs', _graph.id])
  }
}
