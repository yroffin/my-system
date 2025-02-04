import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import * as _ from 'lodash';
import { SysGraph } from '../../models/graph';
import { NGXLogger } from 'ngx-logger';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class GraphApiService {
  constructor(private logger: NGXLogger, private api: ApiService, private messageService: MessageService) { }

  /**
   * find all graph
   * @returns 
   */
  findAllLazy(): Promise<SysGraph[]> {
    return new Promise<SysGraph[]>(async (resolve, reject) => {
      let entities = await this.api.findAll('sysGraphEntities');
      let map = _.map(entities._embedded.sysGraphEntities, async (entity) => {
        return <SysGraph>{
          "id": this.api.extractId(entity._links.self.href),
          "location": entity.location,
          "label": entity.label,
          "style": entity.style,
          "rules": entity.rules,
        }
      })
      resolve(Promise.all(map));
    })
  }

  /**
   * find one graph
   * @param id 
   * @returns 
   */
  findOne(id: string): Promise<SysGraph> {
    return new Promise<SysGraph>(async (resolve, reject) => {
      let entity = await this.api.findOne(id, 'sysGraphEntities');
      resolve({
        "id": id,
        "location": entity.location,
        "label": entity.label,
        "style": entity.style,
        "rules": entity.rules,
        "nodes": await this.api.links(entity._links.nodes.href, 'sysNodeEntities'),
        "edges": await this.api.links(entity._links.edges.href, 'sysEdgeEntities')
      });
    })
  }

  uploadHandler(file: any, id: string, label: string): Promise<SysGraph> {
    return new Promise<SysGraph>((resolve) => {
      let reader = new FileReader();
      reader.addEventListener("loadend", async () => {
        let data: String = new String(reader.result);
        let loadedGraph: SysGraph = {
          id: id,
          location: "default",
          style: "default",
          rules: "default",
          label: label,
          nodes: [],
          edges: []
        }
        if (data.includes('xmlns="http://gexf')) {
          this.messageService.add({
            severity: 'info', summary: 'Info', detail: `Load GEXF file to ${label}`
          });
          // TODO
          // loadedGraph = await this.loadGraphGexf(id, label, data.toString());
        }
        if (data.includes("http://graphml.graphdrawing.org")) {
          this.messageService.add({
            severity: 'info', summary: 'Info', detail: `Load GRAPHML file to ${label}`
          });
          // TODO
          // loadedGraph = await this.loadGraphMl(id, label, data.toString());
        }
        if (loadedGraph.nodes.length == 0) {
          this.messageService.add({
            severity: 'warn', summary: 'warn', detail: `No node for ${label}`
          });
        }
        resolve(loadedGraph)
      });
      reader.readAsText(file)
    })
  }

}
