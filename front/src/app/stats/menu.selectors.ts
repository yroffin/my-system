import { createFeatureSelector } from '@ngrx/store';
import { SysMenuMessage } from '../models/menu';

export const selectMenu = createFeatureSelector<SysMenuMessage>('menu');
