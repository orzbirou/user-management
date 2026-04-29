import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { User } from '../../../../core/models/user.model';
import { selectAllUsers, selectError, selectLoading } from '../../store/user.selectors';
import { UserListComponent } from './user-list.component';

const MOCK_USERS: User[] = [
  { id: 1, email: 'user1@example.com', username: 'john_doe', age: 25 },
  { id: 2, email: 'user2@example.com', username: 'jane_smith', age: 30 },
];

describe('UserListComponent', () => {
  let store: MockStore;

  afterEach(() => {
    store.resetSelectors();
  });

  describe('when loading is true', () => {
    let fixture: ComponentFixture<UserListComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [UserListComponent],
        providers: [
          provideMockStore({
            selectors: [
              { selector: selectAllUsers, value: [] },
              { selector: selectLoading, value: true },
              { selector: selectError, value: null },
            ],
          }),
          { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
          provideRouter([]),
        ],
      }).compileComponents();

      store = TestBed.inject(MockStore);
      fixture = TestBed.createComponent(UserListComponent);
      fixture.detectChanges();
    });

    it('should display the spinner', () => {
      const spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(spinner).toBeTruthy();
    });

    it('should NOT display the data table', () => {
      const table = fixture.debugElement.query(By.css('mat-table'));
      expect(table).toBeNull();
    });
  });

  describe('when loading is false', () => {
    let fixture: ComponentFixture<UserListComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [UserListComponent],
        providers: [
          provideMockStore({
            selectors: [
              { selector: selectAllUsers, value: MOCK_USERS },
              { selector: selectLoading, value: false },
              { selector: selectError, value: null },
            ],
          }),
          { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
          provideRouter([]),
        ],
      }).compileComponents();

      store = TestBed.inject(MockStore);
      fixture = TestBed.createComponent(UserListComponent);
      fixture.detectChanges();
    });

    it('should NOT display the spinner', () => {
      const spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(spinner).toBeNull();
    });

    it('should display the data table', () => {
      const table = fixture.debugElement.query(By.css('mat-table'));
      expect(table).toBeTruthy();
    });
  });
});
