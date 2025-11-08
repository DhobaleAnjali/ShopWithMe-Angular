import { Routes } from '@angular/router';
import { Layout } from './shared/layout/layout';
import { Home } from './shared/home/home';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  // },
  // {
  //   path: '',
  //   component: Layout,
  //   children: [
  //     { path: '', redirectTo: 'home', pathMatch: 'full' },
  //     { path: 'home', component: Home },
  //     {
  //       path: 'products',
  //       loadChildren: () =>
  //         import('./features/products/products.route').then((m) => m.PRODUCTS_ROUTES),
  //     },
  //   ],
  // },

  // { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🔹 Login route (no layout)
  // {
  //   path: 'login',
  //   loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  // },
  //   {
  //   path: 'register',
  //   loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  // },

  // 🔹 All other pages (with layout)
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
