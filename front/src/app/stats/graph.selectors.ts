import { createFeatureSelector } from '@ngrx/store';
import { SysGraph } from '../models/graph';

export const selectGraphs = createFeatureSelector<ReadonlyArray<SysGraph>>('graphs');
export const selectGraph = createFeatureSelector<SysGraph>('graph');
