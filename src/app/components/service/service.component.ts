import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { FirstCommentService } from 'src/app/services/first-comment.service';
import { GetCommentByIndexService } from 'src/app/services/get-comment-by-index.service';
import { CommentT, CommentType } from './comment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styles: [],
  providers: [ 
    FirstCommentService,
    GetCommentByIndexService,
    // {provide: CommentService, useClass: CommentService},
    { provide: 'HttpApi', useValue: 'http://abc.com/'},
    { provide: CommentType, useValue: {id: '0001', name: 'Jack', body: 'BBBB'}},
    { 
      provide: CommentService,
      useFactory(getCommentByIndexService: GetCommentByIndexService) {
        return new CommentService(getCommentByIndexService.getCommentsByIndex(1));
      },
      deps:[GetCommentByIndexService]
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceComponent implements OnInit {
  constructor(
    private commentService: CommentService, 
    @Inject('HttpApi') readonly httpApi, 
    @Inject(CommentType) private commentType: CommentT,
  ) { 
    // console.log(this.commentService.getComments());
    console.log(this.commentService.getComments());
    // console.log(this.commentService);
    
    // console.log(this.httpApi);

    // console.log(this.commentType);
    
    
    
    
  }

  ngOnInit(): void {
  }

}
