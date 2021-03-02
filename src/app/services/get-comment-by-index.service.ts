import { Injectable } from '@angular/core';
import {COMMENTS} from '../data/data';
@Injectable()
export class GetCommentByIndexService {
  constructor() {}
  getCommentsByIndex(index = 0) {
    if (index > COMMENTS.length || index < 0) {
      return COMMENTS;
    } else {
      return COMMENTS.slice(index, index + 1);
    }
  }
}
