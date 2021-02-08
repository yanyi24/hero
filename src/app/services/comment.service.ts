import { Injectable } from '@angular/core';
import { CommentT } from '../components/service/comment';
@Injectable()
export class CommentService {
  constructor(private comment: CommentT[]) { }
  getComments() {
    return this.comment;
  }
}
