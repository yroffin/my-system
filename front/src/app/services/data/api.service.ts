import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api/data';

  constructor(private logger: NGXLogger, private http: HttpClient) { }

  /**
   * extract uri last item
   * @param url 
   * @returns 
   */
  extractId(url: string): string {
    const regex = /\/([^\/]+)$/;
    const match = url.match(regex);

    if (match) {
      const idRegex = match[1];
      return idRegex;
    }
    throw `Error, canot find id in ${url}`
  }


  findAll(entities: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.apiUrl}/${entities}`).subscribe((entity) => {
        this.logger.trace("[FINDALL]", entity)
        resolve(entity)
      });
    })
  }

  findOne(id: string, entities: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.apiUrl}/${entities}/${id}`).subscribe((entity) => {
        resolve(entity)
      });
    })
  }

  links(_links: string, target: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(_links).subscribe((entity) => {
        let targets = eval(`entity._embedded.${target}`)
        this.logger.trace(`links ${_links} => entity._embedded.${target}`, targets)
        resolve(targets)
      });
    })
  }

}
