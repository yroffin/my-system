import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api/data';

  constructor(private http: HttpClient) { }

  findSysGraphEntities(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sysGraphEntities`);
  }

  getSysGraphEntities(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sysGraphEntities/${id}`);
  }

  links(_links: string): Observable<any> {
    return this.http.get<any>(_links);
  }

}
