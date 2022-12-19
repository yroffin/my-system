import { createAction, props } from '@ngrx/store';
import { SysMenuMessage, SysParameterMessage } from '../models/menu';

export const selectMenuIds = createAction(
    '[SysMenuMessage] selectMenuIds', props<{ message: SysMenuMessage }>()
);

export const setDrawMode = createAction(
    '[SysParameterMessage] setDrawMode', props<{ message: boolean }>()
);

export const setGroupMode = createAction(
    '[SysParameterMessage] setGroupMode', props<{ message: boolean }>()
);

export const setZoom = createAction(
    '[SysParameterMessage] setZoom', props<{ message: number }>()
);
