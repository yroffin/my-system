import { createAction, props } from '@ngrx/store';
import { SysGraph } from '../models/graph';

export const retrievedGraphList = createAction(
    '[SysGraph List/API] Retrieve Graphs Success', props<{ graphs: ReadonlyArray<SysGraph> }>()
);

export const retrievedGraph = createAction(
    '[SysGraph List/API] Retrieve Graph Success', props<{ graph: SysGraph }>()
);