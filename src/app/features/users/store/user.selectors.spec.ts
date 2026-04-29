import { User } from '../../../core/models/user.model';
import { userAdapter, UserState } from './user.reducer';
import { selectAllUsers, selectLoading, selectUserById } from './user.selectors';

const MOCK_USERS: User[] = [
  { id: 1, email: 'user1@example.com', username: 'john_doe', age: 25 },
  { id: 2, email: 'user2@example.com', username: 'jane_smith', age: 30 },
];

function buildState(overrides: Partial<UserState>): { users: UserState } {
  return {
    users: {
      ...userAdapter.getInitialState({ loading: false, error: null }),
      ...overrides,
    },
  };
}

describe('User Selectors', () => {
  describe('selectAllUsers', () => {
    it('should return an empty array for the initial state', () => {
      expect(selectAllUsers(buildState({}))).toEqual([]);
    });

    it('should return all users when the store is populated', () => {
      const entityState = userAdapter.setAll(
        MOCK_USERS,
        userAdapter.getInitialState({ loading: false, error: null }),
      );
      expect(selectAllUsers({ users: entityState })).toEqual(MOCK_USERS);
    });
  });

  describe('selectLoading', () => {
    it('should return false by default', () => {
      expect(selectLoading(buildState({ loading: false }))).toBe(false);
    });

    it('should return true when loading is set', () => {
      expect(selectLoading(buildState({ loading: true }))).toBe(true);
    });
  });

  describe('selectUserById', () => {
    it('should return the correct user by id', () => {
      const entityState = userAdapter.setAll(
        MOCK_USERS,
        userAdapter.getInitialState({ loading: false, error: null }),
      );
      expect(selectUserById(1)({ users: entityState })).toEqual(MOCK_USERS[0]);
    });

    it('should return undefined for a non-existent id', () => {
      expect(selectUserById(99)(buildState({}))).toBeUndefined();
    });
  });
});
