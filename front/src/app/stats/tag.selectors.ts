import { createFeatureSelector } from '@ngrx/store';
import { SysTag } from '../models/graph';

export const selectTags = createFeatureSelector<ReadonlyArray<SysTag>>('tags');
