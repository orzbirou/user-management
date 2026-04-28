import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { User } from '../../../../core/models/user.model';
import { UserActions } from '../../store/user.actions';
import { selectAllUsers, selectError, selectLoading } from '../../store/user.selectors';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTableModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  readonly users = this.store.selectSignal(selectAllUsers);
  readonly loading = this.store.selectSignal(selectLoading);
  readonly error = this.store.selectSignal(selectError);

  readonly displayedColumns: string[] = ['id', 'email', 'username', 'age', 'actions'];

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  onEdit(user: User): void {
    this.router.navigate(['/edit', user.id]);
  }

  onDelete(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete "${user.username}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('deleted', user);
        this.store.dispatch(UserActions.deleteUser({ id: user.id }));
      }
    });
  }
}
