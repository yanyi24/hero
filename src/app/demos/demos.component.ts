import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-demos',
  template: `
    <app-drag></app-drag>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
