import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tips',
  template: `
    <div class="tips">
      <p>tips content!!!!</p>
      <div class="btn-group">
        <button class="btn btn-small btn-primary" (click)="onOk()">OK</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {}
  onOk(): void {
    this.router.navigate([{ outlets: { tip: null }}]);
  }
}
