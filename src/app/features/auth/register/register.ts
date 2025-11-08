import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormError } from '../../../shared/form-error/form-error';
import { MatCard } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormError,
    MatCard,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mobilePrimary: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    mobileSecondary: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  onSubmit() {
    if (this.form.valid) {
      console.log('✅ Registration form data:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}

/** 🔐 Custom Validator for Confirm Password */
function passwordMatchValidator(formGroup: any) {
  const password = formGroup.get('password')?.value;
  const confirm = formGroup.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}
