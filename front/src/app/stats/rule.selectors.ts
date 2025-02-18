import { createFeatureSelector } from '@ngrx/store';
import { SysRules } from '../models/rule.model';

export const selectRules = createFeatureSelector<ReadonlyArray<SysRules>>('rules');
export const selectRule = createFeatureSelector<SysRules>('rule');
