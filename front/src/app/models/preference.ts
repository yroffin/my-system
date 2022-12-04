import * as _ from 'lodash';
import { SysEntity } from './entity.model';

export interface SysPreference extends SysEntity {
    grid: boolean;
    info: boolean;
    full: boolean;
    debug: boolean;
    applyRules: boolean;
    maxWidth: number;
    maxHeight: number;
}
