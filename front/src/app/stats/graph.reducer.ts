import { createReducer, on } from '@ngrx/store';
import { SysGraph } from '../models/graph';
import { retrievedGraphList } from './graph.actions';

export const initialState: ReadonlyArray<SysGraph> = [];

export const graphsReducer = createReducer(
    initialState,
    on(retrievedGraphList, (state, { graphs }) => graphs)
);