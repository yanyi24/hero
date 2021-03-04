import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../../../data/data.type';
import {USERS} from '../../../data/data';

@Injectable()
export class UserService {

  constructor() { }
  getUsers(): Observable<User[]> {
    return of(USERS);
  }
}
