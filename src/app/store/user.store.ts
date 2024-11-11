import { Injectable } from '@angular/core';
import {  Store, StoreConfig } from '@datorama/akita';
import { UserState } from '../models/user-state.model';


export function createInitialState(): UserState {
  return {
    users: [
      { id: 1, name: 'Delaney Greer', active: true },
      { id: 2, name: 'Brady Lane', active: false },
    ],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
