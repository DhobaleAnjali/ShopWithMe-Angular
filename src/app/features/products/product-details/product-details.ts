import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChipsModule, MatDividerModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {

  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);

  product: any = history.state.product; // full object sent via navigation

  selectedSize: string | null = null;
  selectedColor: string | null = null;

  ngOnInit(){
    debugger
    console.log(this.product)
    console.log(history.state.product);

  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  addToCart() {
    console.log('ADD TO CART:', {
      product: this.product,
      size: this.selectedSize,
      color: this.selectedColor,
    });
  }

  addToWishlist() {
    console.log('ADD TO WISHLIST:', this.product);
  }
}
