import { createReducer, on } from '@ngrx/store';
import { SysGraph } from '../models/graph';
import { retrievedGraphList, retrievedGraph } from './graph.actions';

export const initialGraphsState: ReadonlyArray<SysGraph> = [];

export const graphsReducer = createReducer(
    initialGraphsState,
    on(retrievedGraphList, (state, { graphs }) => graphs)
);

export const initialGraphState: SysGraph = {
    id: "default",
    location: "default",
    label: "default",
    style: "default",
    rules: "default",
    nodes: [],
    edges: []
}

export const graphReducer = createReducer(
    initialGraphState,
    on(retrievedGraph, (state, { graph }) => graph)
);