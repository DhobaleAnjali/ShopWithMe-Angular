import { Routes } from '@angular/router';
import { Layout } from './shared/layout/layout';

export const routes: Routes = [
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart').then((m) => m.Cart),
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./shared/home/home').then((m) => m.Home),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.route').then((m) => m.PRODUCTS_ROUTES),
      },
      {
        path: 'products/:category/product-details/:id',
        loadComponent: () =>
          import('./features/products/product-details/product-details').then(
            (m) => m.ProductDetails,
          ),
      },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
      },
    ],
  },

  // Fallback — if route not found
  { path: '**', redirectTo: 'login' },

  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  // }
];
