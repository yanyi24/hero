import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styles: []
})
export class ServiceComponent implements OnInit {
  comments = [];
  commentServe: CommentService;
  constructor() { 
    this.commentServe = new CommentService();
    this.comments = this.commentServe.getComments();
    console.log(this.comments);
    
  }

  ngOnInit(): void {
  }

}
