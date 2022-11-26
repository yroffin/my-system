import { createAction, props } from '@ngrx/store';
import { SysTags } from '../models/style';

export const retrievedStyleList = createAction(
    '[SysTags List/API] Retrieve Styles Success', props<{ styles: ReadonlyArray<SysTags> }>()
);

export const retrievedStyle = createAction(
    '[SysTags List/API] Retrieve Style Success', props<{ style: SysTags }>()
);