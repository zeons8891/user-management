import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { of, switchMap, timer } from 'rxjs';
import { UserQuery } from '../../store/user.query';

@Component({
  selector: 'app-user-add-form',
  templateUrl: './user-add-form.component.html',
  styleUrl: './user-add-form.component.scss',
  standalone: false,
})

export class UserAddFormComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userQuery: UserQuery,
    private dialogRef: MatDialogRef<UserAddFormComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required], [this.uniqueNameValidator()]],
      active: [false],
    });
  }

  uniqueNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return timer(300).pipe(
        switchMap(() => {
          const users = this.userQuery.getValue().users;
          const exists = users.some((user) => user.name === control.value);
          return exists ? of({ nameTaken: true }) : of(null);
        })
      );
    };
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close({ name: this.form.value.name, active: this.form.value.active });
    }
  }
}
