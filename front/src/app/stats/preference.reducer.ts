import { createReducer, on } from '@ngrx/store';
import { SysPreference } from '../models/preference';
import { retrievedPreferences } from './preference.actions';

export const initialPreferencesState: SysPreference = {
    id: "default",
    grid: false,
    info: false,
    full: true,
    maxHeight: 16384,
    maxWidth: 16384
};

export const PreferencesReducer = createReducer(
    initialPreferencesState,
    on(retrievedPreferences, (state, { Preferences }) => Preferences)
);
