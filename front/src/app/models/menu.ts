import * as _ from 'lodash';

export enum menuIds {
    default,
    statistics_groups,
    statistics_tags,
    graph_apply_rules,
    graph_change_properties,
    graph_add_new_node
}

export interface SysParameterMessage {
    drawMode: boolean;
    groupMode: boolean;
    zoom: number;
}

export interface SysMenuMessage {
    id: menuIds;
}
