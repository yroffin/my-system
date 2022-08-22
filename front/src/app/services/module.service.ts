import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Module } from '../models/module.model';
import { PageResultSet } from '../models/resultset.model';

@Injectable({ providedIn: 'root' })
export class ModuleService {
    constructor(private http: HttpClient) { }

    getModules(): Observable<Array<Module>> {
        return this.http
            .get<PageResultSet<Module>>(
                'http://localhost:1337/api/browse/module'
            )
            .pipe(map((modules) => modules.results || []));
    }
}