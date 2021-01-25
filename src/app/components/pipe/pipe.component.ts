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
  numArr = [-6,7,6,-4,-3,0,3,1,-2];
  constructor() { }

  ngOnInit(): void {
  }
  addNumber() {
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1; 
    const randomNum = Math.floor(Math.random() * 10);
    this.numArr.push(plusOrMinus * randomNum);
    console.log(this.numArr);
  }
}
