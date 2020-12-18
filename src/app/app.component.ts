import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hero';
  btnCls = 'btn btn-primary'; // 字符串，空格分隔
  btnCls2 = ['btn', 'btn-success'];
  btnCls3 = {
    btn: true,
    'btn-info': true
  };
  num = 1;
  style1 = 'width: 200px;height: 50px;text-align: center;border: 1px solid;';
  style2 = ['width', '200px', 'height', '50px', 'text-align', 'center', 'border', '1px solid']; // 有问题
  style3 = {
    width: '200px',
    height: '50px',
    'text-align': 'center',
    border: '1px solid'
  };


  onClick(event: MouseEvent) {
    console.log('onClick', event.target);
  }
}
