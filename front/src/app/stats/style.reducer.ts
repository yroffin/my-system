import { createReducer, on } from '@ngrx/store';
import { SysStyles } from '../models/style';
import { retrievedStyleList, retrievedStyle } from './style.actions';

export const initialStylesState: ReadonlyArray<SysStyles> = [];

export const stylesReducer = createReducer(
    initialStylesState,
    on(retrievedStyleList, (state, { styles }) => styles)
);

export const initialStyleState: SysStyles = {
    id: "default",
    label: "default",
    tags: []
}

export const styleReducer = createReducer(
    initialStyleState,
    on(retrievedStyle, (state, { style }) => style)
);