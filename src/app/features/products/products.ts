import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetails } from './product-details/product-details';
import { ProductService } from '../../core/services/product';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private route = inject(ActivatedRoute);
  category = '';
  products: any[] = [];

  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit() {
    debugger;
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category') ?? '';
      // this.loadProductsByCategory(this.category);
      if (this.category === 'men') this.getAllMenProducts();
      if (this.category == 'women') this.getAllWomensProducts();
      if (this.category === 'general') this.getGeneralProducts();
    });
  }

  loadProductsByCategory(category: string) {
    this.productService.getProducts(category).subscribe({
      next: (res) => {
        // this.products = res.products;
        console.log('Products loaded:', this.products);
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }

  getAllMenProducts() {
    this.productService.getAllMensProducts().subscribe((data) => {
      this.products = data;
      console.log('Merged products:', data);
    });
  }

  getAllWomensProducts() {
    this.productService.getAllWomensProducts().subscribe((data) => {
      this.products = data;
      console.log('Merged products:', data);
    });
  }

  getGeneralProducts() {
    this.productService.getAllGeneralProducts().subscribe((data) => {
      this.products = data;
      console.log('Merged products:', data);
    });
  }

  goToProduct(p: any) {
    debugger;
    const category = 'men';
    this.router.navigate(['/products', category, 'product-details', p.id], {
      state: { product: p },
    });
  }

  addToCart() {
    console.log('addToCart');
  }

  addToWishlist() {
    console.log('addToWishlist');
  }
}
