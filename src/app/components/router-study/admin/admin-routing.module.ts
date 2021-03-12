import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminComponent} from './admin.component';
import {ManageUserComponent} from './manage-user/manage-user.component';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'user',
            canActivateChild: [AuthGuard],
            children: [
                {path: '', component: ManageUserComponent}
              ]
          },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
