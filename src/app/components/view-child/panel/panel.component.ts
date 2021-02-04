import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent implements OnInit {
  readonly name = 'panel component';
  constructor(readonly el: ElementRef) { }

  ngOnInit(): void {
  }

}
