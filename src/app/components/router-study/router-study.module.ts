import { NgModule } from '@angular/core';

import { RouterStudyRoutingModule } from './router-study-routing.module';
import { CommentsComponent } from './comment/comments.component';
import { UsersComponent } from './user/users.component';
import { RouterStudyComponent } from './router-study.component';
import {CommonModule} from '@angular/common';
import {CommentService} from './comment/comment.service';
import {UserService} from './user/user.service';
import { CommentComponent } from './comment/comment.component';
import { UserComponent } from './user/user.component';
import { TipsComponent } from './tips.component';
import {AdminModule} from './admin/admin.module';
import {AuthModule} from './auth/auth.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [CommentsComponent, UsersComponent, RouterStudyComponent, CommentComponent, UserComponent, TipsComponent],
  imports: [
    RouterStudyRoutingModule,
    CommonModule,
    FormsModule,
    AdminModule,
    AuthModule
  ],
  exports: [RouterStudyComponent],
  providers: [CommentService, UserService]
})
export class RouterStudyModule { }
