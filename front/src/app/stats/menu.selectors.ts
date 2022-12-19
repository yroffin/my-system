import { createFeatureSelector } from '@ngrx/store';
import { SysMenuMessage, SysParameterMessage } from '../models/menu';

export const selectMenu = createFeatureSelector<SysMenuMessage>('menu');
export const selectParameter = createFeatureSelector<SysParameterMessage>('parameter');
