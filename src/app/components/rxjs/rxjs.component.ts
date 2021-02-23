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
  audit,
  buffer, bufferCount, bufferTime, bufferToggle, bufferWhen,
  combineAll,
  concatAll, concatMap, concatMapTo, debounce,
  delay, distinct, distinctUntilChanged, distinctUntilKeyChanged, elementAt,
  endWith, exhaust, filter, first, groupBy, ignoreElements, last,
  map,
  mapTo,
  mergeAll, mergeMap, mergeMapTo, mergeScan, pairwise, pluck, reduce, sample,
  scan, single, skip, skipLast, skipUntil, skipWhile,
  startWith, switchMap, switchMapTo,
  take, takeLast, takeUntil, takeWhile, throttle,
  throttleTime, toArray,
  withLatestFrom
} from 'rxjs/operators';
interface Person {
  age: number,
  name: string
}
@Component({
  selector: 'app-rxjs',
  template: `
    <button class="btn btn-info btn-group-sm">concat</button>
    <div>div</div>
  `,
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const interval$ = interval(500);
    const result = interval$.pipe(throttle(ev => interval(2000)));
    result.subscribe(x => console.log(x));
  }


}
