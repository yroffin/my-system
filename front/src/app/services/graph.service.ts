import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SysGraph } from '../models/graph';
import { PageResultSet } from '../models/resultset.model';

@Injectable({ providedIn: 'root' })
export class GraphService {
    constructor(private http: HttpClient) { }

    getGraphs(filter: string): Observable<Array<SysGraph>> {
        return this.http
            .get<Array<SysGraph>>(
                `http://localhost:1337/api/browse/graph?label=${filter}`
            )
            .pipe(map((graph) => graph || []));
    }

    getHeadGraphs(filter: string): Observable<Array<SysGraph>> {
        return this.http
            .get<Array<SysGraph>>(
                `http://localhost:1337/api/browse/graph/head?label=${filter}`
            )
            .pipe(map((graph) => graph || []));
    }
}
