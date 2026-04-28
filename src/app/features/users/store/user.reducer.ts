import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { User } from '../../../core/models/user.model';
import { UserActions } from './user.actions';

// --- Adapter ---

export const userAdapter = createEntityAdapter<User>();

// --- State ---

export interface UserState extends EntityState<User> {
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = userAdapter.getInitialState({
  loading: false,
  error: null,
});

// --- Reducer ---

export const userReducer = createReducer(
  initialState,

  // Load
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.loadUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, { ...state, loading: false, error: null }),
  ),

  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.updateUserSuccess, (state, { user }) =>
    userAdapter.updateOne({ id: user.id, changes: user }, { ...state, loading: false, error: null }),
  ),

  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.deleteUserSuccess, (state, { id }) =>
    userAdapter.removeOne(id, { ...state, loading: false, error: null }),
  ),

  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
