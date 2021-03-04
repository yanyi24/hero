import {Component, OnInit, ChangeDetectionStrategy, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { User } from '../../../data/data.type';
import {UserService} from './user.service';


@Component({
  selector: 'app-users',
  template: `
    <h3>User page</h3>
    <ul class="list-group">
      <li
        class="list-group-item"
        [class.active]="item.id === selectedId"
        *ngFor="let item of users$ | async"
        (click)="onSelected(item.id)">
        {{ item.name }}
      </li>
    </ul>
  `,
  styles: [`
    .list-group{width: 240px;}
    .list-group-item{cursor: pointer;}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  selectedId: number;
  constructor(private userServer: UserService) { }

  ngOnInit(): void {
    // 直接获取Observable
    this.users$ = this.userServer.getUsers();
  }
  onSelected(id: number): void {
    this.selectedId = id;
  }
}
