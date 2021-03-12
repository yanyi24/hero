import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommentsComponent} from './comment/comments.component';
import {CommentComponent} from './comment/comment.component';
import {TipsComponent} from './tips.component';

const routes: Routes = [
  {
    path: 'comments',
    children: [
      {
        path: '',
        component: CommentsComponent
      }
    ]
  },
  {path: 'comment/:id', component: CommentComponent},
  {
    path: 'tips',
    component: TipsComponent,
    outlet: 'tip'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterStudyRoutingModule { }
