import { createFeatureSelector } from '@ngrx/store';
import { SysStyles } from '../models/style';

export const selectStyles = createFeatureSelector<ReadonlyArray<SysStyles>>('styles');
export const selectStyle = createFeatureSelector<SysStyles>('style');
