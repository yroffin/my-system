import { createReducer, on } from '@ngrx/store';
import { menuIds, SysMenuMessage } from '../models/menu';
import { selectMenuIds } from './menu.actions';

export const initialMenuState: SysMenuMessage = {
    id: menuIds.default
}

export const menuReducer = createReducer(
    initialMenuState,
    on(selectMenuIds, (state, { message }) => message)
);