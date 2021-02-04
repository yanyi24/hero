import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-child-panel',
  templateUrl: './content-child-panel.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentChildPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
