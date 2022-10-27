import { createFeatureSelector } from '@ngrx/store';
import { SysPreference } from '../models/preference';

export const selectPreferences = createFeatureSelector<ReadonlyArray<SysPreference>>('graphs');
