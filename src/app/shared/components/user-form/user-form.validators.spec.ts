import { FormControl } from '@angular/forms';

import { ageRangeValidator, noAdminValidator } from './user-form.validators';

describe('noAdminValidator', () => {
  it('should return { noAdmin: true } for the exact string "admin"', () => {
    const control = new FormControl('admin');
    expect(noAdminValidator(control)).toEqual({ noAdmin: true });
  });

  it('should return { noAdmin: true } for "Admin" (case-insensitive)', () => {
    const control = new FormControl('Admin');
    expect(noAdminValidator(control)).toEqual({ noAdmin: true });
  });

  it('should return null for a valid username "valid_user"', () => {
    const control = new FormControl('valid_user');
    expect(noAdminValidator(control)).toBeNull();
  });

  it('should return null for an empty value', () => {
    const control = new FormControl('');
    expect(noAdminValidator(control)).toBeNull();
  });
});

describe('ageRangeValidator', () => {
  const validator = ageRangeValidator(18, 100);

  it('should return null for a valid age of 25', () => {
    expect(validator(new FormControl(25))).toBeNull();
  });

  it('should return null for the minimum boundary value of 18', () => {
    expect(validator(new FormControl(18))).toBeNull();
  });

  it('should return null for the maximum boundary value of 100', () => {
    expect(validator(new FormControl(100))).toBeNull();
  });

  it('should return ageRange error for age below minimum (17)', () => {
    expect(validator(new FormControl(17))).toEqual({ ageRange: { min: 18, max: 100 } });
  });

  it('should return ageRange error for age above maximum (101)', () => {
    expect(validator(new FormControl(101))).toEqual({ ageRange: { min: 18, max: 100 } });
  });

  it('should return null for a null value (defers to Validators.required)', () => {
    expect(validator(new FormControl(null))).toBeNull();
  });

  it('should return null for an empty string (defers to Validators.required)', () => {
    expect(validator(new FormControl(''))).toBeNull();
  });
});
