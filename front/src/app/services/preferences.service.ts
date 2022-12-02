import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { SysEdge, SysGraph, SysNode } from '../models/graph';
import { DatabaseService } from './database.service';
import { Parser } from 'xml2js';
import { NGXLogger } from 'ngx-logger';
import { Base16Service } from './base16.service';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'ngx-webstorage';
import { DatabaseEntity } from './database-entity.service';
import { SysPreference } from '../models/preference';
const parser = new Parser();

@Injectable({ providedIn: 'root' })
export class PreferenceService extends DatabaseEntity<SysPreference> {

    constructor(
        private _logger: NGXLogger,
        private _storage: LocalStorageService
    ) {
        super()
        this.init("preferences", this._storage, this._logger)
        if (!this.findOne("default")) {
            this.store({
                id: "default",
                full: false,
                grid: false,
                info: false,
                maxWidth: 16384,
                maxHeight: 16384
            }, (entity) => {
            })
        }
    }

}
