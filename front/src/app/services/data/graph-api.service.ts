import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { result } from 'lodash';
import { SysGraph } from '../../models/graph';

@Injectable({
  providedIn: 'root'
})
export class GraphApiService {
  private apiUrl = '/api/data';

  constructor(private api: ApiService) { }

  getSysGraphs(): any {
    return new Promise<SysGraph[]>((resolve, reject) => {
      this.api.findSysGraphEntities().subscribe(value => {
        resolve(value);
      })
    })
  }

  findOne(id: string): any {
    return new Promise<SysGraph>((resolve, reject) => {
      this.api.getSysGraphEntities(id).subscribe(entity => {
        console.log(entity._links.self.href)
        this.api.links(entity._links.self.href).subscribe(self => {
          console.log("RESULT", self)
        })
        resolve({
          "id": "string",
          "label": entity.label,
          "style": entity.style,
          "rules": entity.rules,
          "nodes": [],
          "edges": []
        });
      })
    })
  }

}
