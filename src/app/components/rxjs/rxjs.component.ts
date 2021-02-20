import { Component, OnInit } from '@angular/core';
import {concat, empty, from, fromEvent, iif, interval, of, range, timer} from 'rxjs';
import {map, scan, take, throttleTime} from 'rxjs/operators';

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
    // const arr1 = ['a', 'b', 'c'];
    // const arr2 = [1, 2, 3];
    // // @ts-ignore
    // console.log(arr1.concat(arr2));
    // const source$ = of({ name: 'Brian' }, [1, 2, 3], function hello() {
    //   return 'Hello';
    // });
    //
    // const subscribe = source$.subscribe(val => console.log(val));

    // const arraySource$ = from([1, 2, 3, 4, 5]);
    // const arraySubscribe = arraySource$.subscribe(value => console.log(value));

    // const promiseSource$ = from(new Promise(resolve => resolve('Hello world')));
    // promiseSource$.subscribe(res => console.log(res));
    // const map = new Map([
    //   [1, 'hi']
    // ]);
    // map.set(2, 'Bye');
    // map.set(3, 'rxjs');
    // const mapSource$ = from(map);
    // mapSource$.subscribe(res => console.log(res));

    // const event$ = fromEvent(document, 'click');
    // const example = event$.pipe(
    //   map(event => `Event time: ${event.timeStamp}`)
    // );
    // example.subscribe(val => console.log(val));

    // timer(2000,1000).subscribe(res => console.log(res));

    // const n = Math.random();
    // const iff$ = iif(
    //   () => n > 0.5, /* 判断条件 */
    //   of('随机数大于0.5'), /* 满足条件，将推送这条流 */
    //   of('随机数小于0.5') /* 反之，推送这条 */
    // );
    // iff$.subscribe(res => console.log(res));
    //take(4) 只取流的前4个值
    const timer$ = interval(1000).pipe(take(4));
    const sequence$ = range(1, 10);
    const result = concat(timer$, sequence$);
    result.subscribe(x => console.log(x));
  }
  concatArr(): void {
    const arr1$ = from(['a', 'b', 'c']);
    const arr2$ = from([1, 2, 3]);
    concat(arr1$, arr2$).subscribe(res => console.log(res));
  }

}
