import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {User} from '../../../data/data.type';
import {UserService} from './user.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user',
  template: `
    <div *ngIf="user$ | async as user">
      <h4>{{user.name}}</h4>
      <p><span>{{user.username}}</span> | Email: <span>{{user.email}}</span></p>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  user$: Observable<User>;
  constructor(private userServe: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(
      switchMap(params => this.userServe.getUser(params.id))
    );
  }

}
