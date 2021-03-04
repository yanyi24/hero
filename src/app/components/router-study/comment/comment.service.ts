import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Comment} from '../../../data/data.type';
import {COMMENTS} from '../../../data/data';
import {map} from 'rxjs/operators';

@Injectable()
export class CommentService {

  constructor() { }
  getComments(): Observable<Comment[]> {
    return of(COMMENTS);
  }
  // 根据Id匹配数据
  getComment(id: number | string): Observable<Comment> {
    return this.getComments().pipe(
      map((comments: Comment[]) => comments.find(comment => comment.id === +id))
    );
  }
}
