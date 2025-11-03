import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
    // , MatCard, MatCardContent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  products: any[] = [];
  categories = [
    {
      name: 'Male',
      image:
        'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Female',
      image:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Kids',
      image:
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // ✅ Modern injection
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products;
        console.log('Products loaded:', this.products);
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }
}
