import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tpl-outlet',
  templateUrl: './tpl-outlet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TplOutletComponent implements OnInit {
  @Input() render: TemplateRef<any>;
  ctx = {$implicit: 'default', value: 'context value'}
  constructor() { }

  ngOnInit(): void {
  }

}
