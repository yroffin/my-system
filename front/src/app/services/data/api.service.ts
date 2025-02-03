import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api/data';

  constructor(private logger: NGXLogger, private http: HttpClient) { }

  findSysGraphEntities(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.apiUrl}/sysGraphEntities`).subscribe((entity) => {
        resolve(entity)
      });
    })
  }

  getSysGraphEntities(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.apiUrl}/sysGraphEntities/${id}`).subscribe((entity) => {
        resolve(entity)
      });
    })
  }

  links(_links: string, target: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(_links).subscribe((entity) => {
        let targets = eval(`entity._embedded.${target}`)
        this.logger.debug(`links ${_links} => entity._embedded.${target}`, targets)
        resolve(targets)
      });
    })
  }

}
