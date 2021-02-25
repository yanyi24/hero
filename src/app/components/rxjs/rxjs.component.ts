import { Component, OnInit } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  combineLatest,
  concat, ConnectableObservable,
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
  range, ReplaySubject,
  Subject, throwError,
  timer,
  zip
} from 'rxjs';
import {
  audit,
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
  bufferWhen,
  catchError,
  combineAll,
  concatAll,
  concatMap,
  concatMapTo,
  count,
  debounce,
  delay,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  elementAt,
  endWith,
  exhaust,
  filter,
  first,
  groupBy,
  ignoreElements,
  last,
  map,
  mapTo,
  max,
  mergeAll,
  mergeMap,
  mergeMapTo,
  mergeScan,
  min,
  multicast,
  pairwise,
  pluck,
  publish,
  publishBehavior,
  reduce,
  refCount,
  retry,
  retryWhen,
  sample,
  scan, share, shareReplay,
  single,
  skip,
  skipLast,
  skipUntil,
  skipWhile,
  startWith,
  switchMap,
  switchMapTo,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  throttle,
  throttleTime,
  timeInterval,
  timeout,
  timeoutWith,
  timestamp,
  toArray,
  withLatestFrom
} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';
interface Person {
  age: number;
  name: string;
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
    const shared = range(0, 4).pipe(
      shareReplay(2)
    );

    shared.subscribe(res => console.log('A: ' + res));

    setTimeout(() => {
      shared.subscribe(res => console.log('B: ' + res));
    }, 2000);
  }


}
