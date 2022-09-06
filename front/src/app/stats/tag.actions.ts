import { createAction, props } from '@ngrx/store';
import { SysTag } from '../models/graph';

export const retrievedTagsList = createAction(
    '[Tag List/API] Retrieve Tags Success',
    props<{ tags: ReadonlyArray<SysTag> }>()
);