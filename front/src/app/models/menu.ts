import * as _ from 'lodash';

export enum menuIds {
    default,
    statistics_groups,
    statistics_tags,
    statistics_summary,
    graph_apply_rules,
    graph_change_properties,
    graph_add_new_node,
    graph_layout_bread_first,
    graph_layout_concentric,
    graph_layout_circle,
    graph_layout_grid,
    graph_layout_cose
}

export interface SysParameterMessage {
    drawMode: boolean;
    groupMode: boolean;
    zoom: number;
}

export interface SysMenuMessage {
    id: menuIds;
}
