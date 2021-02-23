import { Component, OnInit } from '@angular/core';
import {
  combineLatest,
  concat,
  empty,
  forkJoin,
  from,
  fromEvent,
  iif,
  interval,
  merge,
  of,
  partition,
  race,
  range,
  Subject,
  timer,
  zip
} from 'rxjs';
import {
  buffer, bufferCount, bufferTime, bufferToggle, bufferWhen,
  combineAll,
  concatAll, concatMap, concatMapTo,
  delay,
  endWith, exhaust, groupBy,
  map,
  mapTo,
  mergeAll, mergeMap, mergeMapTo, mergeScan, pairwise, pluck, reduce,
  scan,
  startWith, switchMap, switchMapTo,
  take,
  throttleTime, toArray,
  withLatestFrom
} from 'rxjs/operators';

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
    const clicks = fromEvent(document, 'click');
    const higherOrder = clicks.pipe(
      map((ev) => interval(1000).pipe(take(5))),
    );
    const result = higherOrder.pipe(exhaust());
    // 不管点击多少次，都会先完成上一次未完成的interval的流
    result.subscribe(x => console.log(x));
  }
  concatArr(): void {
    const arr1$ = from(['a', 'b', 'c']);
    const arr2$ = from([1, 2, 3]);
    concat(arr1$, arr2$).subscribe(res => console.log(res));
  }

}
