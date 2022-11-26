import * as _ from 'lodash';

export interface SysTag {
    id: string;
    label: string;
    selector: string;
    style: any
}

export interface SysTags {
    id: string;
    tags: Array<SysTag>;
}

