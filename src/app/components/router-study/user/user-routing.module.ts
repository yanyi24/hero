import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users.component';
import {UserComponent} from './user.component';
import {CanDeactivateGuard} from './can-deactivate.guard';
import {UserResolveService} from './user-resolve.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsersComponent,
        children: [
          {
            path: ':id',
            component: UserComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              user: UserResolveService
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
