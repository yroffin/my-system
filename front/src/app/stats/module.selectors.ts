import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Module } from '../models/module.model';

export const selectModules = createFeatureSelector<ReadonlyArray<Module>>('modules');
