import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-switch',
  template: `
    <p>
      <input type="radio" name="fruit" value="apple" id="apple" [(ngModel)]="fruit" />
      <label for="apple">🍎</label>
    </p>
    <p>
      <input type="radio" name="fruit" value="pear" id="pear" [(ngModel)]="fruit" />
      <label for="pear">🍐</label>
    </p>
    <p>
      <input type="radio" name="fruit" value="other" id="other" [(ngModel)]="fruit" />
      <label for="other">other</label>
    </p>
    选择的水果: {{ fruit }}
    <div class="content" [ngSwitch]="fruit">
      <p *ngSwitchCase="'apple'">这是苹果</p>
      <p *ngSwitchCase="'pear'">这是梨</p>
      <p *ngSwitchDefault>啥都不是</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgSwitchComponent implements OnInit {
  fruit = '';
  constructor() { }

  ngOnInit(): void {
  }

}
