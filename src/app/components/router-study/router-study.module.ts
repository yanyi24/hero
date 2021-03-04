import { NgModule } from '@angular/core';

import { RouterStudyRoutingModule } from './router-study-routing.module';
import { CommentsComponent } from './comment/comments.component';
import { UsersComponent } from './user/users.component';
import { RouterStudyComponent } from './router-study.component';
import {CommonModule} from '@angular/common';
import {CommentService} from './comment/comment.service';
import {UserService} from './user/user.service';
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [CommentsComponent, UsersComponent, RouterStudyComponent, CommentComponent],
  imports: [
    RouterStudyRoutingModule,
    CommonModule
  ],
  exports: [RouterStudyComponent],
  providers: [CommentService, UserService]
})
export class RouterStudyModule { }
