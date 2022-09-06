import { createReducer, on } from '@ngrx/store';
import { SysTag } from '../models/graph';
import { retrievedTagsList } from './tag.actions';

export const initialState: ReadonlyArray<SysTag> = [];

export const tagsReducer = createReducer(
    initialState,
    on(retrievedTagsList, (state, { tags }) => tags)
);