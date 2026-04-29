import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, of, switchMap } from 'rxjs';

import { User } from '../../../core/models/user.model';
import { UserActions } from './user.actions';

// --- Mock data (assignment.md §3) ---

const MOCK_USERS: User[] = [
  { id: 1, email: 'user1@example.com', username: 'john_doe', age: 25 },
  { id: 2, email: 'user2@example.com', username: 'jane_smith', age: 30 },
  { id: 3, email: 'admin@example.com', username: 'admin', age: 35 },
  { id: 4, email: 'test@test.com', username: 'test_user', age: 22 },
];

// --- Effects ---

export const loadUsers$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        of(MOCK_USERS).pipe(
          delay(500),
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error: unknown) =>
            of(UserActions.loadUsersFailure({ error: String(error) })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const updateUser$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ user }) => {
        console.log('[Effect] updateUser', user);
        return of(UserActions.updateUserSuccess({ user }));
      }),
    ),
  { functional: true },
);

export const deleteUser$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ id }) => {
        console.log('[Effect] deleteUser id:', id);
        return of(UserActions.deleteUserSuccess({ id }));
      }),
    ),
  { functional: true },
);
