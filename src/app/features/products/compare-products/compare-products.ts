import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStore } from '../../../core/store/search.store';
import { AiSearchService } from '../../../core/services/ai-search-service';

@Component({
  selector: 'app-compare-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compare-products.html',
  styleUrl: './compare-products.scss',
})
export class CompareProducts {
  searchStore = inject(SearchStore);
  aiService = inject(AiSearchService);

  products: any[] = [];

  compareData: any;

  constructor() {
    effect(() => {
      this.products = this.searchStore.compareProducts();

      if (this.products.length === 2) {
        this.compare();
      }
    });
  }

  compare() {
    this.aiService.compareProducts(this.products[0], this.products[1]).subscribe((res: any) => {
      console.log(res);
      this.compareData = JSON.parse(res.choices[0].message.content);
    });
  }

  ngOnDestroy() {
    const products = this.searchStore.compareProducts();
    if (products.length === 2) {
      this.searchStore.clearComparedProducts();
    }
  }
}
