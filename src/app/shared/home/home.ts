import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';


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
      name: 'Men',
      image:
        'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Women',
      image:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'General',
      image:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // ✅ Modern injection
  private productService = inject(ProductService);
  private router = inject(Router)

  ngOnInit(): void {
    // this.productService.getProducts().subscribe({
    //   next: (res) => {
    //     this.products = res.products;
    //     console.log('Products loaded:', this.products);
    //   },
    //   error: (err) => console.error('Error loading products:', err),
    // });
  }

  goToCategory(category: string) {
    this.router.navigate(['/products', category.toLowerCase()]);
  }
}
