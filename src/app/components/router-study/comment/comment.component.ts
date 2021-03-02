import {Component, OnInit, ChangeDetectionStrategy, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {COMMENTS} from '../../../data/data';
import {Comment} from '../../../data/data.type';
import {map} from 'rxjs/operators';
// 注册获取数据的服务
@Injectable()
class CommentService {
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
@Component({
  selector: 'app-comment',
  template: `
    <h3>Comment page</h3>
    <ul class="list-group">
      <li
        class="list-group-item"
        [class.active]="item.id === selectedId"
        *ngFor="let item of comments$ | async"
        (click)="onSelected(item.id)">
        {{ item.name }}
      </li>
    </ul>
  `,
  styles: [`
    .list-group{width: 340px;}
    .list-group-item{cursor: pointer;}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommentService]
})
export class CommentComponent implements OnInit {
  comments$: Observable<Comment[]>;
  selectedId: number;
  constructor(private commentServer: CommentService) { }

  ngOnInit(): void {
    // 直接获取Observable
    this.comments$ = this.commentServer.getComments();
  }
  onSelected(id: number): void {
    this.selectedId = id;
  }
}
