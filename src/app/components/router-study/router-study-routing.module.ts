import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './user/users.component';
import {CommentsComponent} from './comment/comments.component';
import {CommentComponent} from './comment/comment.component';

const routes: Routes = [
  {path: 'comments', component: CommentsComponent},
  {path: 'comment/:id', component: CommentComponent},
  {path: 'users', component: UsersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterStudyRoutingModule { }
