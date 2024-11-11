import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map } from 'rxjs';
import { UserState } from '../models/user-state.model';
import { UserStore} from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  allUsers$ = this.select(state => state.users);
  canAddUser$ = this.allUsers$.pipe(
    map(users => users.length < 5 && users.every(user => user.active))
  );

  constructor(store: UserStore) {
    super(store);
  }

  getActiveCount() {
    return this.getValue().users.filter(user => user.active).length;
  }
}
