import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatSelectModule, ReactiveFormsModule, CommonModule],
})
export class Profile implements OnInit {
  private fb = inject(FormBuilder);
   private router = inject(Router);

  profileForm!: FormGroup;
  isEditMode = false;

ngOnInit(): void {
  this.profileForm = this.fb.group({
    username: ['Jenny Doe', Validators.required],
    email: ['jenny@example.com', [Validators.required, Validators.email]],
    profilePicture: [''],
    address: ['123 Main Street', Validators.required],
    telephone: ['+1234567890', Validators.required],
    gender: ['female', Validators.required],
  });
}


  editProfile() {
    this.isEditMode = true;
    this.profileForm.enable();
  }

  saveProfile() {
    if (this.profileForm.valid) {
      console.log('Profile saved:', this.profileForm.value);
      this.isEditMode = false;
      this.profileForm.disable();
      this.router.navigate(['/home'])
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.profileForm.reset({
      username: 'John Doe',
      email: 'john@example.com',
      profilePicture: '',
      address: '123 Main Street',
      telephone: '+1234567890',
      gender: 'male',
    });
    this.profileForm.disable();
  }
}
