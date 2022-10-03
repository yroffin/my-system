import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { SysGraph } from 'src/app/models/graph';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { DatabaseService } from 'src/app/services/database.service';
import { GraphService } from 'src/app/services/graph.service';
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

  msgs: Message[] = []

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
    private graphsService: GraphService,
    private clipboardService: ClipboardService,
    private databaseService: DatabaseService,
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
          label: graph.label,
          nodes: graph.nodes,
          edges: graph.edges
        }
      });
    })
  }

  ngOnInit(): void {
    let graphs = this.databaseService.findAllGraphs()
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
    let graphs = this.databaseService.deleteGraph(_graph)
    this.store.dispatch(retrievedGraphList({ graphs }))
  }

  showImport(_graph: SysGraph) {
    this.displayImport = true;
    this.selectedGraph = _graph;
  }

  openNew(name?: string): void {
    if (name) {
      this.databaseService.storeGraph({
        id: name,
        label: name,
        edges: [],
        nodes: []
      })
      let graphs = this.databaseService.findAllGraphs()
      this.store.dispatch(retrievedGraphList({ graphs }))
    }
  }

  uploadHandler(event: any, _graph?: SysGraph): void {
    if (_graph) {
      let reader = new FileReader();
      reader.addEventListener("loadend", async () => {
        let data: String = new String(reader.result);
        let loadedGraph: SysGraph = {
          id: _graph.id,
          label: _graph.label,
          nodes: [],
          edges: []
        }
        if (data.includes('xmlns="http://gexf')) {
          this.messageService.add({
            severity: 'info', summary: 'Info', detail: `Load GEXF file to ${_graph.label}`
          });
          loadedGraph = await this.graphsService.loadGraphGexf(_graph.id, _graph.label, data.toString());
        }
        if (data.includes("http://graphml.graphdrawing.org")) {
          this.messageService.add({
            severity: 'info', summary: 'Info', detail: `Load GRAPHML file to ${_graph.label}`
          });
          loadedGraph = await this.graphsService.loadGraphMl(_graph.id, _graph.label, data.toString());
        }
        if (loadedGraph.nodes.length == 0) {
          this.messageService.add({
            severity: 'warn', summary: 'warn', detail: `No node for ${_graph.label}`
          });
        }
        this.databaseService.storeGraph(loadedGraph)
      });
      reader.readAsText(event.files[0])
      this.displayImport = false
    }
  }

  gexf(_graph: SysGraph): void {
    let graph = this.graphsService.getGraph(_graph.id + "")
    console.log(graph)
    this.exportData = this.graphsService.toGexf(graph)
    this.exportDataHtml = this.exportData.join('\n')
    this.clipboardService.copyTextToClipboard(this.exportData.join('\n'))
    this.displayExport = true
  }

  select(_graph: SysGraph): void {
    this.router.navigate(['graphs', 'cytoscape', _graph.id])
  }
}
