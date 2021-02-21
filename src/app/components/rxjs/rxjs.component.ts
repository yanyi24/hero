import { Component, OnInit } from '@angular/core';
import {combineLatest, concat, empty, forkJoin, from, fromEvent, iif, interval, merge, of, partition, race, range, timer, zip} from 'rxjs';
import {
  combineAll,
  concatAll,
  delay,
  endWith,
  map,
  mapTo,
  mergeAll, pluck,
  scan,
  startWith,
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
    // take(4) 只取流的前4个值
    // const interval$ = interval(1000).pipe(
    //   delay(3000),
    //   // take(4) 只取流的前4个值
    //   take(4)
    // );
    // const sequence$ = range(1, 3);
    // const result = concat(interval$, sequence$);
    // result.subscribe(x => console.log(x));

    // const clicks$ = fromEvent(document, 'click');
    // const higherOrder$ = clicks$.pipe(
    //   map(ev => interval(1000).pipe(take(2)))
    // );
    // higherOrder$.subscribe(res => console.log(res));
    // const firstOrder$ = higherOrder$.pipe(concatAll());
    // firstOrder$.subscribe(x => console.log(x));

    // const clicks$ = fromEvent(document, 'click');
    // const interval$ = interval(1000).pipe(delay(3000));
    // const merged$ = merge(clicks$, interval$);
    // merged$.subscribe(res => console.log(res));

//     const interval1$ = interval(1000).pipe(take(10), mapTo('a'));
//     const interval2$ = interval(2000).pipe(take(6), mapTo('b'));
//     const interval3$ = interval(500).pipe(take(10), mapTo('c'));
// // 最后一个参数设为2，表示不管合并了多少个流，最多也只能merge其中的两个（与参数顺序无关）
//     const merged = merge(interval1$, interval2$, interval3$, 2);
//     merged.subscribe(x => console.log(x));

    // const clicks$ = fromEvent(document, 'click');
    // const higherOrder$ = clicks$.pipe(map((ev) => interval(1000)));
    // const firstOrder$ = higherOrder$.pipe(mergeAll());
    // firstOrder$.subscribe(x => console.log(x));

    // const observableValues = of(1, 2, 3, 4, 5, 6);
    // const [evens$, odds$] = partition(observableValues, (value, index) => value % 2 === 0);
    // odds$.subscribe(x => console.log('odds', x));
    // evens$.subscribe(x => console.log('evens', x));

    // const obs1$ = interval(1000).pipe(mapTo('fast one'));
    // const obs2$ = interval(3000).pipe(mapTo('medium one'));
    // const obs3$ = interval(5000).pipe(mapTo('slow one'));
    // race(obs3$, obs1$, obs2$).subscribe(winner => console.log(winner));

    // const age$ = of<number>(27, 25, 29);
    // const name$ = of<string>('Foo', 'Bar', 'Beer');
    // const isDev$ = of<boolean>(true, true, false);
    // zip(age$, name$, isDev$).subscribe(x => console.log(x));

    // const clicks$ = fromEvent(document, 'click');
    // /*
    //   每次点击，都会映射成interval发出的三个值
    //   点击三次higherOrder才算完成
    //   然后会把每次点击发出的值使用combineLatest策略合并每次点击的最新值
    // */
    // const higherOrder = clicks$.pipe(
    //   map(ev =>
    //     interval(2000).pipe(take(3))
    //   ),
    //   take(3)
    // );
    // const result$ = higherOrder.pipe(combineAll());
    //
    // result$.subscribe(x => console.log(x));

    // const observable = forkJoin([
    //   of(1, 2, 3, 4),
    //   Promise.resolve(8),
    //   timer(4000),
    // ]);
    // observable.subscribe({
    //   next: value => console.log(value),
    //   complete: () => console.log('This is how it ends!'),
    // });

    // of('from source')
    //   .pipe(startWith('first', 'second'), endWith('end'))
    //   .subscribe(x => console.log(x));

    const clicks = fromEvent(document, 'click').pipe(pluck('clientX'));
    const interval$ = interval(1000);
// const result = clicks.pipe(withLatestFrom(interval$));
    const result = interval$.pipe(withLatestFrom(clicks));
    result.subscribe(x => console.log(x));

  }
  concatArr(): void {
    const arr1$ = from(['a', 'b', 'c']);
    const arr2$ = from([1, 2, 3]);
    concat(arr1$, arr2$).subscribe(res => console.log(res));
  }

}
