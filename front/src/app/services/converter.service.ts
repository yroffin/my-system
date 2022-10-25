import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { DatabaseService } from './database.service';
import { Parser } from 'xml2js';
import { NGXLogger } from 'ngx-logger';
import { MessageService } from 'primeng/api';
import { _INITIAL_REDUCERS } from '@ngrx/store/src/tokens';

@Injectable({ providedIn: 'root' })
export class ConverterService {
    constructor(
        private messageService: MessageService,
        private databaseService: DatabaseService,
        private logger: NGXLogger
    ) { }

    uploadHandler(file: any): Promise<string> {
        return new Promise<string>((resolve) => {
            let reader = new FileReader();
            reader.addEventListener("loadend", async () => {
                var uInt8Array = new Uint8Array(<any>reader.result),
                    i = uInt8Array.length;
                var biStr = []; //new Array(i);
                while (i--) { biStr[i] = String.fromCharCode(uInt8Array[i]); }
                var base64 = window.btoa(biStr.join(''));
                resolve(base64)
            });
            reader.readAsArrayBuffer(file)
        })
    }
}
