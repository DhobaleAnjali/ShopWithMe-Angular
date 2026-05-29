import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  searchResult = signal<any>(null);
  reviewSummary = signal<any>(null);
  compareProducts = signal<any[]>([]);

  setSearchResult(data: any) {
    this.searchResult.set(data);
  }

  setReviewSummary(data: string) {
    this.reviewSummary.set(data);
  }


  addToCompare(product:any){
    const currentProducts = this.compareProducts();
    const alreadyExists = currentProducts.some(
      (p)=> p.id === product.id
    );
    if(alreadyExists) return;
    if(currentProducts.length < 2){
      this.compareProducts.set([
        ...currentProducts,
        product
      ]);
    }
  }

  clearComparedProducts(){
    this.compareProducts.set([]);
  }
}
