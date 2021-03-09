import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../../../data/data.type';
import {EMPTY, Observable, of} from 'rxjs';
import {UserService} from './user.service';
import {first, mergeMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// 引入Resolve接口
export class UserResolveService implements Resolve<User>{

  constructor(private userServe: UserService, private router: Router) { }
  // 实现对应方法
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User | Observable<never> {
    return this.userServe.getUser(route.paramMap.get('id')).pipe(
      first(), // 让流变成可结束流
      mergeMap(user => {
        if (user) {
          return of(user);
        } else {
          this.router.navigateByUrl('/');
          return EMPTY;
        }
      })
    );
  }
}
