import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from '../../../core/models/user.model';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    // --- Load ---
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    // --- Update ---
    'Update User': props<{ user: User }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: string }>(),

    // --- Delete ---
    'Delete User': props<{ id: number }>(),
    'Delete User Success': props<{ id: number }>(),
    'Delete User Failure': props<{ error: string }>(),
  },
});
