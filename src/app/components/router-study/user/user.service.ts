import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../../../data/data.type';
import {USERS} from '../../../data/data';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor() { }
  getUsers(): Observable<User[]> {
    return of(USERS);
  }
  getUser(id: number | string): Observable<User> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.id === +id))
    );
  }
}
