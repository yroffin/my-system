import * as _ from 'lodash';
import { SysEntity } from './entity.model';

export interface SysRule {
    name: string;
    conditions: any;
    event: any;
}

export interface SysRules extends SysEntity {
    rules: SysRule[];
}
