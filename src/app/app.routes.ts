import { Routes } from '@angular/router';

import { UserEditComponent } from './features/users/components/user-edit/user-edit.component';
import { UserListComponent } from './features/users/components/user-list/user-list.component';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'edit/:id', component: UserEditComponent },
];
