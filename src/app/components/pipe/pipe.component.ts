import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styles: [
  ]
})
export class PipeComponent implements OnInit {
  obj:{[key: number]: string} = {2: 'foo', 1: 'bar', 4: 'a', 3: 'b'};
  map = new Map([[2, 'foo'], [1, 'bar']]);
  arr = [1,2,3];
  constructor() { }

  ngOnInit(): void {
  }

}
