import { User } from '../../../core/models/user.model';
import { UserActions } from './user.actions';
import { initialState, userAdapter, userReducer } from './user.reducer';

const MOCK_USERS: User[] = [
  { id: 1, email: 'user1@example.com', username: 'john_doe', age: 25 },
  { id: 2, email: 'user2@example.com', username: 'jane_smith', age: 30 },
];

describe('userReducer', () => {
  it('should return the initial state for an unknown action', () => {
    const action = { type: '@@UNKNOWN' } as never;
    expect(userReducer(undefined, action)).toEqual(initialState);
  });

  describe('loadUsers', () => {
    it('should set loading to true', () => {
      const state = userReducer(initialState, UserActions.loadUsers());
      expect(state.loading).toBe(true);
    });

    it('should clear any existing error', () => {
      const errorState = { ...initialState, error: 'previous error' };
      const state = userReducer(errorState, UserActions.loadUsers());
      expect(state.error).toBeNull();
    });
  });

  describe('loadUsersSuccess', () => {
    it('should populate entities with the returned users', () => {
      const state = userReducer(initialState, UserActions.loadUsersSuccess({ users: MOCK_USERS }));
      expect(state.ids).toEqual([1, 2]);
      expect(state.entities[1]).toEqual(MOCK_USERS[0]);
      expect(state.entities[2]).toEqual(MOCK_USERS[1]);
    });

    it('should set loading to false', () => {
      const loadingState = { ...initialState, loading: true };
      const state = userReducer(loadingState, UserActions.loadUsersSuccess({ users: MOCK_USERS }));
      expect(state.loading).toBe(false);
    });

    it('should replace existing entities (setAll behaviour)', () => {
      const populatedState = userAdapter.setAll(MOCK_USERS, { ...initialState });
      const newUsers: User[] = [{ id: 99, email: 'new@example.com', username: 'new', age: 40 }];
      const state = userReducer(populatedState, UserActions.loadUsersSuccess({ users: newUsers }));
      expect(state.ids).toEqual([99]);
      expect(state.entities[1]).toBeUndefined();
    });
  });

  describe('loadUsersFailure', () => {
    it('should store the error message', () => {
      const state = userReducer(initialState, UserActions.loadUsersFailure({ error: 'Network error' }));
      expect(state.error).toBe('Network error');
    });

    it('should set loading to false', () => {
      const loadingState = { ...initialState, loading: true };
      const state = userReducer(loadingState, UserActions.loadUsersFailure({ error: 'Network error' }));
      expect(state.loading).toBe(false);
    });
  });
});
