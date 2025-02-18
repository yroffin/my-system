import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import * as _ from 'lodash';
import { SysGraph } from '../../models/graph';
import { NGXLogger } from 'ngx-logger';
import { MessageService } from 'primeng/api';
import { SysStyles, SysTag } from '../../models/style';

@Injectable({
  providedIn: 'root'
})
export class StyleApiService {
  constructor(private logger: NGXLogger, private api: ApiService, private messageService: MessageService) { }

  /**
   * find all graph
   * @returns 
   */
  findAllLazy(): Promise<SysStyles[]> {
    return new Promise<SysStyles[]>(async (resolve, reject) => {
      let entities = await this.api.findAll('sysStyleEntities');
      let map = _.map(entities._embedded.sysStyleEntities, async (entity) => {
        return <SysStyles>{
          "id": this.api.extractId(entity._links.self.href),
          "location": entity.location,
          "label": entity.label,
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
  findOne(id: string): Promise<SysStyles> {
    return new Promise<SysStyles>(async (resolve, reject) => {
      let entity = await this.api.findOne(id, 'sysStyleEntities');
      let tags = _.map(await this.api.links(entity._links.tags.href, 'sysTagEntities'), (entity) => {
        return <SysTag>{
          label: entity.label,
          selector: entity.selector,
          style: JSON.parse(entity.style)
        }
      });
      resolve({
        "id": id,
        "location": entity.location,
        "label": entity.label,
        "tags": tags
      });
    })
  }

  /**
 * find one graph
 * @param id 
 * @returns 
 */
  findByLocation(location: string): Promise<SysStyles> {
    return new Promise<SysStyles>(async (resolve, reject) => {
      let entity = (await this.api.findByLocation(location, 'sysStyleEntities'))._embedded.sysStyleEntities[0];
      let tags = _.map(await this.api.links(entity._links.tags.href, 'sysTagEntities'), (entity) => {
        return <SysTag>{
          label: entity.label,
          selector: entity.selector,
          style: JSON.parse(entity.style)
        }
      });
      resolve({
        "id": this.api.extractId(entity._links.self.href),
        "location": entity.location,
        "label": entity.label,
        "tags": tags
      });
    })
  }

}
