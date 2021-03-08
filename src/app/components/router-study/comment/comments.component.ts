import {Component, OnInit, ChangeDetectionStrategy, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Comment} from '../../../data/data.type';
import {CommentService} from './comment.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UsersComponent} from '../user/users.component';

@Component({
  selector: 'app-comments',
  template: `
    <h3>Comment page</h3>
    <ul class="list-group">
<!--      <li-->
<!--        class="list-group-item"-->
<!--        [class.active]="item.id === selectedId"-->
<!--        *ngFor="let item of comments$ | async"-->
<!--        [routerLink]="['/comment', item.id]"-->
<!--      >-->
<!--        {{ item.name }}-->
<!--      </li>  -->
      <li
        class="list-group-item"
        [class.active]="item.id === selectedId"
        *ngFor="let item of comments$ | async"
        (click)="toComment(item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
  `,
  styles: [`
    .list-group{width: 340px;}
    .list-group-item{cursor: pointer;}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  comments$: Observable<Comment[]>;
  selectedId: number;
  constructor(private commentServer: CommentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // 直接获取Observable
    this.comments$ = this.commentServer.getComments();
    // this.route.params.subscribe(res => console.log(res))
    // this.route.paramMap.subscribe(res => console.log(res))
    // this.comments$ = this.route.params.pipe(
    //   switchMap(params => {
    //     this.selectedId = +params.id;
    //     return this.commentServer.getComments();
    //   })
    // );
    // 或者这样：
    // this.comments$ = this.route.paramMap.pipe(
    //   switchMap(paramsMap => {
    //     this.selectedId = +paramsMap.get('id');
    //     return this.commentServer.getComments();
    //   })
    // );
    // this.route.queryParams.subscribe(res => console.log(res));
    // this.route.queryParamMap.subscribe(res => console.log(res));
  }
  toComment(id: number): void {
    this.router.navigateByUrl('/comment/' + id).then(r => console.log(r));
  }
}
