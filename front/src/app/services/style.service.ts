import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { DatabaseService } from './database.service';
import { Parser } from 'xml2js';
import { NGXLogger } from 'ngx-logger';
import { Base16Service } from './base16.service';
import { MessageService } from 'primeng/api';
import { _INITIAL_REDUCERS } from '@ngrx/store/src/tokens';
import { SysTags } from '../models/style';
const parser = new Parser();

@Injectable({ providedIn: 'root' })
export class StyleService {
    constructor(
        private messageService: MessageService,
        private databaseService: DatabaseService,
        private base16: Base16Service,
        private logger: NGXLogger
    ) { }

    getStyles(): Array<SysTags> {
        let styles = this.databaseService.findAllStyles()
        let result: Array<SysTags> = new Array<SysTags>()
        _.each(styles, (style) => {
            result.push(style)
        })
        return result
    }

    deleteStyle(style: SysTags): Array<SysTags> {
        return this.databaseService.deleteStyle(style.id)
    }

    getStyle(id: string): SysTags | undefined {
        return this.databaseService.findStyle(id)
    }

    saveStyle(_style: SysTags): void {
        this.databaseService.storeStyle(_style)
    }

}
