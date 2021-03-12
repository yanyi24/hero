import { NgModule } from '@angular/core';

import { RouterStudyRoutingModule } from './router-study-routing.module';
import { RouterStudyComponent } from './router-study.component';
import {CommonModule} from '@angular/common';
import { TipsComponent } from './tips.component';
import {AuthModule} from './auth/auth.module';
import {FormsModule} from '@angular/forms';
import {CommentModule} from './comment/comment.module';


@NgModule({
  declarations: [ RouterStudyComponent, TipsComponent],
  imports: [
    RouterStudyRoutingModule,
    CommonModule,
    FormsModule,
    AuthModule,
    CommentModule,
  ],
  exports: [RouterStudyComponent]
})
export class RouterStudyModule { }
