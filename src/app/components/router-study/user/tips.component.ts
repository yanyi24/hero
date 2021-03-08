import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tips',
  template: `
    <div class="tips">
      <p>tips content!!!!</p>
      <div class="btn-group">
        <button class="btn btn-small btn-primary">OK</button>
        <button class="btn btn-small btn-danger">Cancel</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
