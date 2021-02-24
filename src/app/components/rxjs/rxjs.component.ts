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
  Subject, throwError,
  timer,
  zip
} from 'rxjs';
import {
  audit,
  buffer, bufferCount, bufferTime, bufferToggle, bufferWhen, catchError,
  combineAll,
  concatAll, concatMap, concatMapTo, count, debounce,
  delay, distinct, distinctUntilChanged, distinctUntilKeyChanged, elementAt,
  endWith, exhaust, filter, first, groupBy, ignoreElements, last,
  map,
  mapTo, max,
  mergeAll, mergeMap, mergeMapTo, mergeScan, min, pairwise, pluck, reduce, retry, retryWhen, sample,
  scan, single, skip, skipLast, skipUntil, skipWhile,
  startWith, switchMap, switchMapTo,
  take, takeLast, takeUntil, takeWhile, tap, throttle,
  throttleTime, timeInterval, timeout, timeoutWith, timestamp, toArray,
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
    of<Person>(
      {age: 5, name: 'Jack'},
      { age: 8, name: 'Rose'},
      { age: 12, name: 'Bob'}
    ).pipe(
      min<Person>((a: Person, b: Person) => a.age > b.age ? 1 : -1)
    ).subscribe(
      (res: Person) => console.log(res.name)
    );


  }


}
