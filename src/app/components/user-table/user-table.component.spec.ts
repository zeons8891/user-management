import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../shared/material.module';

import { UserTableComponent } from './user-table.component';

fdescribe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      imports:[MaterialModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
