import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product';
import { SearchStore } from '../../core/store/search.store';
import productsData from '../../../assets/data/allProductsAiSearch.json';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private router = inject(Router);
  public searchStore = inject(SearchStore);

  category = '';
  products: any[] = [];
  filteredProducts: any[] = [];
  allDummyProducts: any = productsData.products;

  constructor() {
    effect(() => {
      const aiData = this.searchStore.searchResult();
      if (!aiData || this.category !== 'ai-searched-products') return;
      this.getFilteredProducts(aiData);
    });
  }

  ngOnInit() {
    debugger;
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category') ?? '';
      if (this.category === 'men') this.getAllMenProducts();
      if (this.category == 'women') this.getAllWomensProducts();
      if (this.category === 'general') this.getGeneralProducts();
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
    const category = 'men';
    this.router.navigate(['/products', category, 'product-details', p.id], {
      state: { product: p },
    });
  }

  getFilteredProducts(aiData: any) {
    console.log(this.allDummyProducts);
    this.filteredProducts = [];
    this.filteredProducts = this.allDummyProducts.filter(
      (product: any) =>
        (!aiData.category ||
          product.category?.toLowerCase().includes(aiData.category.toLowerCase())) &&
        (!aiData.color || product.title?.toLowerCase().includes(aiData.color.toLowerCase())) &&
        (!aiData.maxPrice || product.price <= aiData.maxPrice) &&
        (!aiData.brand || product.brand?.toLowerCase().includes(aiData.brand.toLowerCase())) &&
        (!aiData.purpose ||
          product.title?.toLowerCase().includes(aiData.purpose.toLowerCase()) ||
          product.category?.toLowerCase().includes(aiData.purpose.toLowerCase())),
    );

    this.products = this.filteredProducts;
  }

  addToCart() {
    console.log('addToCart');
  }

  addToWishlist() {
    console.log('addToWishlist');
  }

  ngOnDestroy() {
    this.searchStore.setSearchResult(null);
  }
}
