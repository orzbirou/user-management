import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';

import { UserFormComponent } from '../../../../shared/components/user-form/user-form.component';
import { User } from '../../../../core/models/user.model';
import { UserActions } from '../../store/user.actions';
import { selectLoading, selectUserById } from '../../store/user.selectors';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [MatProgressSpinnerModule, UserFormComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly userId = Number(this.route.snapshot.paramMap.get('id'));

  readonly loading = this.store.selectSignal(selectLoading);
  readonly user = this.store.selectSignal(selectUserById(this.userId));

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  onFormSubmit(changes: Omit<User, 'id'>): void {
    const currentUser = this.user();
    if (currentUser) {
      console.log('updated', { ...currentUser, ...changes });
    }
    this.router.navigate(['/']);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
