import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SysGraph, SysTag } from '../models/graph';
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

    getGraph(id: string): Observable<SysGraph> {
        return this.http
            .get<SysGraph>(
                `http://localhost:1337/api/browse/graph/${id}`
            )
            .pipe(map((graph) => graph || {}));
    }

    uploadgraph(id: string, data: string): Observable<SysGraph> {
        return this.http
            .post<SysGraph>(
                `http://localhost:1337/api/browse/graph/${id}`, data
            )
            .pipe(map((graph) => graph || {}));
    }

    getHeadGraphs(filter?: string): Observable<Array<SysGraph>> {
        if (filter) {
            return this.http
                .get<Array<SysGraph>>(
                    `http://localhost:1337/api/browse/graph??head=true&label=${filter}`
                )
                .pipe(map((graph) => graph || []));
        } else {
            return this.http
                .get<Array<SysGraph>>(
                    `http://localhost:1337/api/browse/graph?head=true`
                )
                .pipe(map((graph) => graph || []));
        }
    }

    getAllTags(): Observable<Array<SysTag>> {
        return this.http
            .get<Array<SysTag>>(
                `http://localhost:1337/api/browse/tags`
            )
            .pipe(map((tag) => tag || []));
    }
}
