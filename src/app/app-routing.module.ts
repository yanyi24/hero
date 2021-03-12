import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AuthGuard} from './components/router-study/auth/auth.guard';
import {SelectivePreloadingStrategyService} from './services/selective-preloading-strategy.service';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./components/router-study/admin/admin.module').then(m => m.AdminModule),
    // canLoad: [AuthGuard],
    // data: {preload: true}
  },
  {
    path: 'users',
    loadChildren: () => import('./components/router-study/user/user.module').then(m => m.UserModule),
    data: {preload: true}
  },
  {path: '', redirectTo: '/comments', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: SelectivePreloadingStrategyService, useHash: false})],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategyService]
})
export class AppRoutingModule { }
