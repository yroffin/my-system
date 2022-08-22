import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SysGraph } from '../models/graph';

export const selectGraphs = createFeatureSelector<ReadonlyArray<SysGraph>>('graphs');
