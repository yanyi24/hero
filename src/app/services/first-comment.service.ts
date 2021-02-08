import { Injectable } from '@angular/core';
import comments from '../data/comments';

@Injectable()
export class FirstCommentService {
  constructor() { }
  getComments() {
    return comments[0];
  }
}
