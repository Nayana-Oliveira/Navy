import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Posts } from './pages/posts/posts';
import { PostDetalhe } from './pages/post-detalhe/post-detalhe';
import { Reviews } from './pages/reviews/reviews';
import { Postits } from './pages/postits/postits';
import { Sobre } from './pages/sobre/sobre';
import { AdminLogin } from './pages/admin-login/admin-login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth-guard';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'posts', component: Posts },
  { path: 'posts/:id', component: PostDetalhe },
  { path: 'reviews', component: Reviews },
  { path: 'postits', component: Postits },
  { path: 'sobre', component: Sobre },
  { path: 'admin', component: AdminLogin },
  { path: 'admin/dashboard', component: AdminDashboard , canActivate: [authGuard]},
  {path: '**', component: NotFound}
];