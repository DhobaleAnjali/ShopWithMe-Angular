import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToCart } from '../../states/cart/cart.actions';
import { addToWishlist } from '../../states/wishlist/wishlist.actions';
import { SearchStore } from '../../../core/store/search.store';
import { AiSearchService } from '../../../core/services/ai-search-service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly store: Store<{ cart: number }> = inject(Store);
  private searchStore = inject(SearchStore);
  cart = this.store.select((state) => state.cart);
  private aiSearchService = inject(AiSearchService);

  product: any = history.state.product; // full object sent via navigation

  selectedSize: string | null = null;
  selectedColor: string | null = null;
  reviewSummary: any;
  compareMessage = '';
  showToast = false;
  toastMessage = '';

  ngOnInit() {
    // this.searchStore.setReviewSummary(this.product.reviews);
    this.summarizeReviews();
  }

  summarizeReviews() {
    const reviews = this.product.reviews;

    const reviewText = reviews.map((r: any) => r.comment || r.body).join('\n');

    this.aiSearchService.summarizeReviews(reviewText).subscribe((res: any) => {
      debugger;
      this.reviewSummary = JSON.parse(res.choices[0].message.content);
      console.log(this.reviewSummary);
    });
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
    this.store.dispatch(addToCart({ item: this.product }));
    this.toastMessage = 'Item added to Cart';
    this.showToastMessage();
  }

  addToWishlist() {
    console.log('ADD TO WISHLIST:', this.product);
    this.store.dispatch(addToWishlist({ item: this.product }));
    this.toastMessage = 'Item added to Wishlist';
    this.showToastMessage();
  }

  addToCompare(product: any) {
    this.searchStore.addToCompare(product);
    const products = this.searchStore.compareProducts();
    if (products.length === 1) {
      this.toastMessage = 'First product added for comparison';
      this.showToastMessage();
    }
    if (products.length === 2) {
      this.toastMessage = 'Opening AI comparison';
      this.showToastMessage();
      setTimeout(() => {
        this.router.navigate(['/products/compare']);
      }, 1000);
    }
  }

  showToastMessage() {
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
