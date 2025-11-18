import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatLabel],
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
  groupedProducts: any = {};
  groupedProductsArr = [];
  currentIndex = 0;
  dots = [0, 1, 2];

  // ✅ Modern injection
  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit(): void {
    this.productService.getDefaultProducts().subscribe((res: any) => {
      this.products = res.products; // <-- set products
      this.groupProductsByCategory(); // <-- now group
      console.log('Grouped: ', this.groupedProducts);
    });
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % 3;
    this.updateTransform();
  }

  goToSlide(i: number) {
    this.currentIndex = i;
    this.updateTransform();
  }

  updateTransform() {
    const container = document.querySelector('.category-container') as HTMLElement;
    container.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  groupProductsByCategory() {
    this.groupedProducts = this.products.reduce((acc: any, item: any) => {
      const category = item.category;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(item);
      return acc;
    }, {});
    // this.groupedProductsArr= this.groupedProductsArray();
  }

  //   get groupedProductsArray() {
  //   return Object.entries(this.groupedProducts).map(([key, value]) => ({
  //     key,
  //     value
  //   }));
  // }

  get groupedProductsArray() {
    return Object.entries(this.groupedProducts).map(([key, value]) => ({ key, value }));
  }

  goToProduct(p: string) {}

  goToCategory(category: string) {
    this.router.navigate(['/products', category.toLowerCase()]);
  }
}
