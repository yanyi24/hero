import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  message: string;
  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }
  setMessage() {
    this.message = this.authService.isLoggedIn ? '已经登录~' : '没有登录！';
  }
  login() {
    this.message = '登录中 ...';
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        const redirectUrl = this.authService.redirectUrl || '/admin'; // 防止用户直接在地址栏输入造成的redirectUrl为空的错误
        // 跳转回重定向路径
        this.router.navigate([redirectUrl]);
      }
    });
  }
  logout() {
    this.authService.logout();
    this.setMessage();
    this.router.navigate(['/']);
  }
}
