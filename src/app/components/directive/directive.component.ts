import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  template: `
    <p appHighlight>Highlight me!</p>
  `,
  styles: [
  ]
})
export class DirectiveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
