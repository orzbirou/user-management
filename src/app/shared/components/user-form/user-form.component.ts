import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  Injector,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { User } from '../../../core/models/user.model';

// --- Custom validators ---

function noAdminValidator(control: AbstractControl): ValidationErrors | null {
  return control.value?.toLowerCase() === 'admin' ? { noAdmin: true } : null;
}

function ageRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === '') return null;
    const num = Number(value);
    return num >= min && num <= max ? null : { ageRange: { min, max } };
  };
}

// --- Component ---

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly injector = inject(Injector);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly user = input<User | undefined>(undefined);
  readonly formSubmit = output<Omit<User, 'id'>>();
  readonly cancel = output<void>();

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
        noAdminValidator,
      ],
    ],
    age: [null as number | null, [Validators.required, ageRangeValidator(18, 100)]],
  });

  get emailControl() {
    return this.form.controls.email;
  }

  get usernameControl() {
    return this.form.controls.username;
  }

  get ageControl() {
    return this.form.controls.age;
  }

  ngOnInit(): void {
    effect(
      () => {
        const user = this.user();
        if (user) {
          this.form.patchValue({ email: user.email, username: user.username, age: user.age });
          this.form.markAsPristine();
          this.cdr.markForCheck();
        }
      },
      { injector: this.injector },
    );
  }

  onSubmit(): void {
    if (this.form.valid && this.form.dirty) {
      const { email, username, age } = this.form.getRawValue();
      this.formSubmit.emit({ email: email!, username: username!, age: Number(age) });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
