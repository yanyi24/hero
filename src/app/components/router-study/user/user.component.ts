import {Component, OnInit, ChangeDetectionStrategy, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { USERS } from '../../../data/data';
import { User } from '../../../data/data.type';
// 注册获取数据的服务
@Injectable()
class UserService {
  getUsers(): Observable<User[]> {
    return of(USERS);
  }
}

@Component({
  selector: 'app-user',
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
  providers: [UserService]
})
export class UserComponent implements OnInit {
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
