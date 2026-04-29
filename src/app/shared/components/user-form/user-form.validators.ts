import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noAdminValidator(control: AbstractControl): ValidationErrors | null {
  return control.value?.toLowerCase() === 'admin' ? { noAdmin: true } : null;
}

export function ageRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === '') return null;
    const num = Number(value);
    return num >= min && num <= max ? null : { ageRange: { min, max } };
  };
}
