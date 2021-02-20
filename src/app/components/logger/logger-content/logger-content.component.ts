import { ChangeDetectionStrategy, Component, Host, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-logger-content',
  template: `
    <p>logger-content works!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggerContentComponent implements OnInit {

  constructor(@Host() private loggerservice: LoggerService) { }

  ngOnInit(): void {
    this.loggerservice.log('logger-content 组件打印的内容！');
  }

}
