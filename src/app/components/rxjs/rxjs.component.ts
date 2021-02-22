import { Component, OnInit } from '@angular/core';
import {combineLatest, concat, empty, forkJoin, from, fromEvent, iif, interval, merge, of, partition, race, range, timer, zip} from 'rxjs';
import {
  buffer, bufferCount, bufferTime, bufferToggle, bufferWhen,
  combineAll,
  concatAll, concatMap,
  delay,
  endWith,
  map,
  mapTo,
  mergeAll, mergeMap, pluck,
  scan,
  startWith, switchMap, switchMapTo,
  take,
  throttleTime,
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
    const interval$ = interval(500)
      .pipe(
        /*
        * 在1秒时推送第一个流： [0]
        * 此后，每等待3秒推送下一个：[5,6,7] [11,12,13]...
        * */
        bufferTime(1000, 3000)
      )
      // .subscribe(res => console.log(res));
    const clicks$ = fromEvent(document, 'click')
      .pipe(
        switchMapTo(of('hello'))
      )
      // .subscribe(res => console.log(res));
// 发出延迟值
    const source = of(2000, 1000);
// 将内部 observable 映射成 source，当前一个完成时发出结果并订阅下一个
    const example = source.pipe(
      concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
    );
// 输出: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
//     const subscribe = example.subscribe(val =>
//       console.log(`With concatMap: ${val}`)
//     );

// 展示 concatMap 和 mergeMap 之间的区别
    const mergeMapExample = source
      .pipe(
        // 只是为了确保 meregeMap 的日志晚于 concatMap 示例
        // delay(5000),
        mergeMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
      )
      .subscribe(val => console.log(`With mergeMap: ${val}`));

  }
  concatArr(): void {
    const arr1$ = from(['a', 'b', 'c']);
    const arr2$ = from([1, 2, 3]);
    concat(arr1$, arr2$).subscribe(res => console.log(res));
  }

}
