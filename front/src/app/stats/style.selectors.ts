import { createFeatureSelector } from '@ngrx/store';
import { SysTags } from '../models/style';

export const selectStyles = createFeatureSelector<ReadonlyArray<SysTags>>('styles');
export const selectStyle = createFeatureSelector<SysTags>('style');
