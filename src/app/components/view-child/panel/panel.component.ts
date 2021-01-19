import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styles: [
  ]
})
export class PanelComponent implements OnInit {
  readonly name = 'panel component';
  constructor(readonly el: ElementRef) { }

  ngOnInit(): void {
  }

}
