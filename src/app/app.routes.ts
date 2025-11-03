import { Routes } from '@angular/router';
import { Layout } from './shared/layout/layout';
import { Home } from './shared/home/home';

export const routes: Routes = [{
  path: '',
  component: Layout,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
  ]
},
// {
//   path: 'auth',
//   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
// }
];
