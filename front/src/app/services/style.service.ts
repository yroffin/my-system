import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { NGXLogger } from 'ngx-logger';
import { SysStyles } from '../models/style';
import { DatabaseEntity } from './database-entity.service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class StyleService extends DatabaseEntity<SysStyles> {

    constructor(
        private _logger: NGXLogger,
        private _storage: LocalStorageService
    ) {
        super()
        this.init("styles", this._storage, this._logger)
    }

}
