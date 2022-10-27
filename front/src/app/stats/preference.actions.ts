import { createAction, props } from '@ngrx/store';
import { SysPreference } from '../models/preference';

export const retrievedPreferences = createAction(
    '[SysPreference] Retrieve Preferences Success', props<{ Preferences: SysPreference }>()
);
