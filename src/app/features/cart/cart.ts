import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cartItems = [
    {
      image:
        'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp',
      name: 'hjxdhf',
      size: 'XL',
      price: '234',
      qty: '1',
      returnDate: '45.78.9292',
    },
    {
      image:
        'https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/thumbnail.webp',
      name: 'hjxdhf',
      size: 'XL',
      price: '234',
      qty: '1',
      returnDate: '45.78.9292',
    },
    {
      image:
        'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp',
      name: 'hjxdhf',
      size: 'XL',
      price: '234',
      qty: '1',
      returnDate: '45.78.9292',
    },
  ];
}
