import { NgModule } from '@angular/core';

import { RouterStudyRoutingModule } from './router-study-routing.module';
import { CommentComponent } from './comment/comment.component';
import { UserComponent } from './user/user.component';
import { RouterStudyComponent } from './router-study.component';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [CommentComponent, UserComponent, RouterStudyComponent],
  imports: [
    RouterStudyRoutingModule,
    CommonModule
  ],
  exports: [RouterStudyComponent]
})
export class RouterStudyModule { }
