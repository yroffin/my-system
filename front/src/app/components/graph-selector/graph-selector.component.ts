import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SysGraph } from '../../models/graph';
import { ClipboardService } from '../../services/clipboard.service';
import { LoggerModule, NGXLogger } from 'ngx-logger';
import { retrievedGraphList } from '../../stats/graph.actions';
import { selectGraph, selectGraphs } from '../../stats/graph.selectors';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { GraphApiService } from '../../services/data/graph-api.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-graph-selector',
  templateUrl: './graph-selector.component.html',
  providers: [MessageService],
  styleUrls: ['./graph-selector.component.css'],
  imports: [FloatLabelModule, LoggerModule, InputTextModule, ButtonModule, DialogModule, FileUploadModule, ConfirmDialogModule, ConfirmPopupModule, TableModule, ToastModule, FormsModule, ToolbarModule]
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

  graph$;
  graphs$;

  constructor(
    private router: Router,
    private logger: NGXLogger,
    private graphApiService: GraphApiService,
    private clipboardService: ClipboardService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private store: Store) {
    this.graph$ = this.store.select(selectGraph);
    this.graphs$ = this.store.select(selectGraphs);
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
          location: graph.location,
          style: graph.style,
          rules: graph.rules,
          label: graph.label,
          nodes: graph.nodes,
          edges: graph.edges
        }
      });
    })
  }

  async ngOnInit(): Promise<void> {
    this.store.dispatch(retrievedGraphList({ graphs: await this.graphApiService.findAllLazy() }))
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
    /*
    TODO
    let graphs = this.graphsService.delete(_graph.id)
    this.store.dispatch(retrievedGraphList({ graphs }))
    */
  }

  showImport(_graph: SysGraph) {
    this.displayImport = true;
    this.selectedGraph = _graph;
  }

  openNew(name?: string): void {
    /*
    TODO
    if (name) {
      this.graphsService.store({
        id: name,
        location: "default",
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
      */
  }

  uploadHandler(event: any, _graph?: SysGraph): void {
    /*
    TODO
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
      */
  }

  gexf(_graph: SysGraph): void {
    /*
    TODO
    let graph = this.graphsService.findOne(_graph.id + "")
    this.exportData = this.graphsService.toGexf(graph)
    this.exportDataHtml = this.exportData.join('\n')
    this.clipboardService.copyTextToClipboard(this.exportData.join('\n'))
    this.displayExport = true
    */
  }

  selectCytoscape(_graph: SysGraph): void {
    this.router.navigate(['graphs', 'cytoscape', _graph.id])
  }

  selectThreejs(_graph: SysGraph): void {
    this.router.navigate(['graphs', 'threejs', _graph.id])
  }
}
