import { ChangeDetectionStrategy, Component, OnInit, Optional, SkipSelf } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-logger',
  template: `
  <div>
    <p>logger works!</p>
    <ng-content></ng-content>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoggerService]
})
export class LoggerComponent implements OnInit {

  constructor(@Optional() private loggerservice: LoggerService) { }

  ngOnInit(): void {
    this.loggerservice.log('这是组件内打印的日志');
  }

}
