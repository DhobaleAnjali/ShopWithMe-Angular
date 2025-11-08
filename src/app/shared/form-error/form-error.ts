import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [MatError],
  templateUrl: './form-error.html',
})
export class FormError {
  @Input({ required: true }) control!: AbstractControl | null;

  get firstError(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched) return null;

    const errors: ValidationErrors = this.control.errors;

    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Enter a valid email address';
    if (errors['minlength'])
      return `Minimum length is ${errors['minlength'].requiredLength}`;
    if (errors['maxlength'])
      return `Maximum length is ${errors['maxlength'].requiredLength}`;
    if (errors['pattern']) return 'Invalid format';
    if (errors['min']) return `Value must be at least ${errors['min'].min}`;
    if (errors['max']) return `Value must not exceed ${errors['max'].max}`;

    return null;
  }
}
