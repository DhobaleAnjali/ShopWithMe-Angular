import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
  wishlistItems:any[] = [];
  readonly store: Store<{ wishlist: any[] }> = inject(Store);
  wishlist$ = this.store.select((state) => state.wishlist);

  ngOnInit() {
    this.wishlist$.subscribe((data: any) => {
      debugger
      console.log('Cart Data before:', this.wishlistItems);
      this.wishlistItems = [...data];
      console.log('Cart Data:', this.wishlistItems);
    });
  }
}
