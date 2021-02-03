import {ChangeDetectionStrategy, Component, OnInit, Output} from '@angular/core';
import {EventEmitter} from 'events';
// 定义主题参数
type AlertTheme = 'primary' | 'danger' | 'warning' | 'secondary' | 'success' | 'info' | 'dark' | 'light';
// 限定参数
export interface AlertOption {
  content: string;
  theme?: string;
}
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [`
    .close {
      display: block;
      width: 20px;
      height: 20px;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -15px;
      cursor: pointer;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {
  // Required将对象类型AlertOption的所有可选属性转化为必填属性
  options: Required<AlertOption> = {
    content: 'test',
    theme: 'primary',
  }
  // 注册关闭的输出事件
  @Output() readonly closed = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  // 获取class
  get wrapClass(): string {
    return `alert alert-${this.options.theme} fixed-top`
  }
  // 合并默认参数与传入的参数
  setOptions(options: AlertOption): void {
    this.options = {...this.options, ...options}
  }
}
