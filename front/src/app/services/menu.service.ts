import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { menuIds } from '../models/menu';
import { selectMenuIds } from '../stats/menu.actions';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private store: Store) {

  }

  dispatch(id: menuIds) {
    this.store.dispatch(selectMenuIds({
      message: {
        id
      }
    }))
    this.store.dispatch(selectMenuIds({
      message: {
        id: menuIds.default
      }
    }))
  }
}
