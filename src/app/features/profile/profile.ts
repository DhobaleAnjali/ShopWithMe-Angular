import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class Profile {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  profileForm = this.fb.group({
    username: ['Jenny Doe', Validators.required],

    email: ['jenny@example.com', [Validators.required, Validators.email]],

    profilePicture: [''],

    address: ['123 Main Street', Validators.required],

    telephone: ['+1234567890', Validators.required],

    gender: ['female', Validators.required],
  });

  saveProfile() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);

      this.router.navigate(['/home']);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  cancelEdit() {
    this.profileForm.reset({
      username: 'Jenny Doe',
      email: 'jenny@example.com',
      profilePicture: '',
      address: '123 Main Street',
      telephone: '+1234567890',
      gender: 'female',
    });
  }
}
