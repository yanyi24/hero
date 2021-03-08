import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Comment} from '../../../data/data.type';
import {switchMap} from 'rxjs/operators';
import {CommentService} from './comment.service';

@Component({
  selector: 'app-comment',
  template: `
    <div class="card" style="width: 18rem;">
      <div class="card-body" *ngIf="comment$ | async as comment; else noneComment">
        <h5 class="card-title">{{comment.name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{comment.email}}</h6>
        <p class="card-text">{{comment.body}}</p>
        <hr>
        <button class="btn btn-primary" (click)="goBack(comment.id)">返回</button>
<!--        <button class="btn btn-primary" routerLink="/comments" [queryParams]="{id: comment.id}">返回</button>-->
      </div>
    </div>
    <ng-template #noneComment>没有comment内容</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {
  comment$: Observable<Comment>;
  constructor(private route: ActivatedRoute, private commentServer: CommentService, private router: Router) { }

  ngOnInit(): void {
    // 使用params获取id
    // this.comment$ = this.route.params.pipe(
    //   switchMap( params => this.commentServer.getComment(params.id))
    // );

    // 使用paramMap获取id
    this.comment$ = this.route.paramMap.pipe(
      switchMap(paramMap => this.commentServer.getComment(paramMap.get('id')))
    );
    console.log(this.route.snapshot)
  }
  goBack(id: number) {
    // this.router.navigateByUrl('/comments?id=' + id)
    this.router.navigate(['comments'], {queryParams: {id}})
  }
}
