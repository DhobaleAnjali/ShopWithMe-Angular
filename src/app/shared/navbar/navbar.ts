import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatFormField, MatLabel],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
