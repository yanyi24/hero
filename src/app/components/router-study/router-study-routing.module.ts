import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './user/users.component';
import {CommentsComponent} from './comment/comments.component';
import {CommentComponent} from './comment/comment.component';
import {UserComponent} from './user/user.component';
import {TipsComponent} from './tips.component';
import {CanDeactivateGuard} from './user/can-deactivate.guard';
import {UserResolveService} from './user/user-resolve.service';

const routes: Routes = [
  {path: 'comments', component: CommentsComponent},
  {path: 'comment/:id', component: CommentComponent},
  {
    path: 'tips',
    component: TipsComponent,
    outlet: 'tip'
  },
  {
    path: 'users',
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
          },

        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterStudyRoutingModule { }
