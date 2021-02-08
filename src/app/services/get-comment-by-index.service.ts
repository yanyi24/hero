import { Injectable } from '@angular/core';
import comments from '../data/comments';
@Injectable()
export class GetCommentByIndexService {
  constructor() {}
  getCommentsByIndex(index = 0) {
    if (index > comments.length || index < 0) {
      return comments;
    } else { 
      return comments.slice(index, index + 1);
    }
  }
}
