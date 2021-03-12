import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
  CanLoad,
  UrlSegment, Route
} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  // 引入服务
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    const url: string = state.url; // 将要跳转的路径
    return this.checkLogin(url);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    return this.canActivate(next, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }
  private checkLogin(url: string): true | UrlTree {
    // 已经登录，直接返回true
    if (this.authService.isLoggedIn) { return true; }
    // 修改登陆后重定向的地址
    this.authService.redirectUrl = url;
    // 重定向到登录页面
    return this.router.parseUrl('/login');
  }

}
