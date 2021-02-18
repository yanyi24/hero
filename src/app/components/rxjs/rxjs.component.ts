import { Component, OnInit } from '@angular/core';
import {concat, from, fromEvent} from 'rxjs';
import {map, scan, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  template: `
    <button class="btn btn-info btn-group-sm" (click)="concatArr()">concat</button>
  `,
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // fromEvent(document, 'click').pipe(
    //   throttleTime(1000),
    //   map((event: MouseEvent) => event.clientX),
    //   scan((count, clientX) => count + clientX, 0)
    // ).subscribe(count => console.log(count));
    const arr1 = ['a', 'b', 'c'];
    const arr2 = [1, 2, 3];
    // @ts-ignore
    console.log(arr1.concat(arr2));
  }
  concatArr(): void {
    const arr1$ = from(['a', 'b', 'c']);
    const arr2$ = from([1, 2, 3]);
    concat(arr1$, arr2$).subscribe(res => console.log(res));
  }

}
