import { createReducer, on } from '@ngrx/store';
import { SysTags } from '../models/style';
import { retrievedStyleList, retrievedStyle } from './style.actions';

export const initialStylesState: ReadonlyArray<SysTags> = [];

export const stylesReducer = createReducer(
    initialStylesState,
    on(retrievedStyleList, (state, { styles }) => styles)
);

export const initialStyleState: SysTags = {
    id: "default",
    tags: []
}

export const styleReducer = createReducer(
    initialStyleState,
    on(retrievedStyle, (state, { style }) => style)
);