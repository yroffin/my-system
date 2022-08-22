import { createReducer, on } from '@ngrx/store';
import { Module } from '../models/module.model';
import { retrievedModuleList } from './module.actions';

export const initialState: ReadonlyArray<Module> = [];

export const modulesReducer = createReducer(
    initialState,
    on(retrievedModuleList, (state, { modules }) => modules)
);