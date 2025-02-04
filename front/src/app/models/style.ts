import * as _ from 'lodash';

export interface SysTag {
    id: string;
    label: string;
    selector: string;
    style: any
}

export interface SysStyles {
    id: string;
    label: string;
    tags: Array<SysTag>;
}

