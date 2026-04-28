import { createFeatureSelector, createSelector } from '@ngrx/store';

import { userAdapter, UserState } from './user.reducer';

// --- Feature selector ---

export const selectUserState = createFeatureSelector<UserState>('users');

// --- Entity selectors (memoized, derived from the adapter) ---

const { selectAll } = userAdapter.getSelectors();

export const selectAllUsers = createSelector(selectUserState, selectAll);

// --- Auxiliary state selectors ---

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading,
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error,
);
