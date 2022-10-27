import { createReducer, on } from '@ngrx/store';
import { SysPreference } from '../models/preference';
import { retrievedPreferences } from './preference.actions';

export const initialPreferencesState: SysPreference = {
    grid: false,
    info: false
};

export const PreferencesReducer = createReducer(
    initialPreferencesState,
    on(retrievedPreferences, (state, { Preferences }) => Preferences)
);
