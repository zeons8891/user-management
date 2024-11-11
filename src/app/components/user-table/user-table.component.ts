import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { filter, Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UserQuery } from '../../store/user.query';
import { UserService } from '../../store/user.service';
import { UserAddFormComponent } from '../user-add-form/user-add-form.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  standalone: false,
})
export class UserTableComponent {
  dataSource = new MatTableDataSource<User>();
  users$!: Observable<User[] | null>;
  canAddUser$!: Observable<boolean>;
  displayedColumns: string[] = ['id', 'name', 'active', 'actions'];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.intializeData();
  }

  toggleActive(id: number) {
    this.userService.toggleActive(id);
  }

  openAddUserModal() {
    const dialogRef = this.dialog.open(UserAddFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.addUser(result);
      }
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }

  private intializeData() {
    this.users$ = this.userQuery.allUsers$;
    this.subscriptions.add(
      this.users$.pipe(filter((users) => users !== null)).subscribe((users) => {
        this.dataSource.data = users ?? [];
      })
    );

    this.canAddUser$ = this.userQuery.canAddUser$;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
