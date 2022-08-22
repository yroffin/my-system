import { createAction, props } from '@ngrx/store';
import { SysGraph } from '../models/graph';

export const retrievedGraphList = createAction(
    '[Module List/API] Retrieve Graphs Success',
    props<{ graphs: ReadonlyArray<SysGraph> }>()
);