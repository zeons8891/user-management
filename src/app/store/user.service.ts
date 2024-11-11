import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserStore } from '../store/user.store';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private userStore: UserStore) {}

  addUser(newUser: Partial<User>) {
    const users = this.userStore.getValue().users;
    const nextId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    const user: User = {
      id: nextId,
      name: newUser.name!,
      active: newUser.active ?? false
    };

    this.userStore.update({ users: [...users, user] });
  }

  toggleActive(userId: number) {
    const users = this.userStore.getValue().users.map(user =>
      user.id === userId ? { ...user, active: !user.active } : user
    );
    this.userStore.update({ users });
  }

  deleteUser(userId: number) {
    const users = this.userStore.getValue().users.filter(user => user.id !== userId);
    this.userStore.update({ users });
  }

}
