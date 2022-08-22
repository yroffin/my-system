import { createAction, props } from '@ngrx/store';
import { Module } from '../models/module.model';

export const retrievedModuleList = createAction(
    '[Module List/API] Retrieve Modules Success',
    props<{ modules: ReadonlyArray<Module> }>()
);