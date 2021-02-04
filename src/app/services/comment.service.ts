import { Injectable } from '@angular/core';
import Comments from '../data/comments';
// @Injectable({
//   providedIn: 'root'
// })
export class CommentService {
  constructor() { }
  getComments() {
    return Comments;
  }
}
