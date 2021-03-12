import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentsComponent} from './comments.component';
import {CommentComponent} from './comment.component';
import {CommentService} from './comment.service';



@NgModule({
  declarations: [CommentsComponent, CommentComponent],
  imports: [CommonModule],
  providers: [CommentService]
})
export class CommentModule { }
