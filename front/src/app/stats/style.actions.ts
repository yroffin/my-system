import { createAction, props } from '@ngrx/store';
import { SysStyles } from '../models/style';

export const retrievedStyleList = createAction(
    '[SysTags List/API] Retrieve Styles Success', props<{ styles: ReadonlyArray<SysStyles> }>()
);

export const retrievedStyle = createAction(
    '[SysTags List/API] Retrieve Style Success', props<{ style: SysStyles }>()
);