import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user/user.component';
import {CommentComponent} from './comment/comment.component';

const routes: Routes = [
  {path: 'comments', component: CommentComponent},
  {path: 'users', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterStudyRoutingModule { }
