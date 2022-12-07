import * as _ from 'lodash';
import { SysEntity } from './entity.model';

export interface SysRule {
    name: string;
    sets: any;
    asserts: any;
}

export interface SysRules extends SysEntity {
    rules: SysRule[];
}
