import { createReducer, on } from '@ngrx/store';
import { menuIds, SysMenuMessage, SysParameterMessage } from '../models/menu';
import { selectMenuIds, setDrawMode, setGroupMode, setZoom } from './menu.actions';

export const initialMenuState: SysMenuMessage = {
    id: menuIds.default
}

export const menuReducer = createReducer(
    initialMenuState,
    on(selectMenuIds, (state, { message }) => {
        state = message
        return state
    })
)

export const initialParameterState: SysParameterMessage = {
    drawMode: false,
    groupMode: false,
    zoom: 1
}

export const parameterReducer = createReducer(
    initialParameterState,
    on(setDrawMode, (state, { message }) => {
        return {
            drawMode: message,
            groupMode: state.groupMode,
            zoom: state.zoom
        }
    }),
    on(setGroupMode, (state, { message }) => {
        return {
            drawMode: state.drawMode,
            groupMode: message,
            zoom: state.zoom
        }
    }),
    on(setZoom, (state, { message }) => {
        return {
            drawMode: state.drawMode,
            groupMode: state.groupMode,
            zoom: message
        }
    })
);
