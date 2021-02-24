# rxjs-操作符-其他类

> 这一节介绍RxJs错误处理类、工具类、数字操作类操作符

## 工具类操作符

从打印日志、处理通知到设置调度器，这些操作符提供了一些有用的工具以补充你的 ```Observable``` 工具箱。

### tap

类似 ```console.log``` ，多用于调试，会返回源 ```Observable``` 的值，不转换值

```typescript
import { fromEvent } from 'rxjs';
import { tap, map } from 'rxjs/operators';

fromEvent(document, 'click').pipe(
  tap((e: MouseEvent) => console.log(e)),
  map(e => e.clientX)
).subscribe(x => console.log(x));
```

### delay

把源 ```Observable``` 推送的每个值，都延迟一定时间推送，可以指定```timeout``` ，也可以指定未来具体的某个```Date``` 

```typescript
import { fromEvent } from 'rxjs';
import { delay, map } from 'rxjs/operators';

fromEvent(document, 'click').pipe(
  delay(1000),
  map((e: MouseEvent) => e.clientX)
).subscribe(x => console.log(x)); // 每次点击都会触发流，但是会等1秒后发出
```

指定未来的某个```Date```

```typescript
import { fromEvent } from 'rxjs';
import { delay, map } from 'rxjs/operators';

fromEvent(document, 'click').pipe(
  delay(new Date('March 15, 2050 12:00:00')),
  map((e: MouseEvent) => e.clientX)
).subscribe(x => console.log(x)); // 延迟到指定时间才发射出流
```

### timeInterval

将源 ```Observable``` 发出的每个值转成一个```Object```，包含当前值、与上一次发出值时，经过的时间

```typescript
import { fromEvent } from 'rxjs';
import { map, timeInterval } from 'rxjs/operators';

 fromEvent(document, 'click').pipe(
  map((e: MouseEvent) => e.clientX),
  timeInterval()
).subscribe(x => console.log(x)); // 输出：TimeInterval {value: 501, interval: 3408}
```

### timestamp

将源 ```Observable``` 发出的每个值转成一个```Object```，包含当前值、当前时间戳

```typescript
import { fromEvent } from 'rxjs';
import { map, timestamp } from 'rxjs/operators';

 fromEvent(document, 'click').pipe(
  map((e: MouseEvent) => e.clientX),
   timestamp()
).subscribe(x => console.log(x)); // 输出：Timestamp {value: 501, timestamp: 1614156294378}
```

### timeout

在指定时间内，不发出值就报错

```typescript
import { interval } from 'rxjs';
import { timeout } from 'rxjs/operators';
// 指定时间内
const seconds = interval(1000);
seconds.pipe(timeout(1100))
.subscribe(
    value => console.log(value), // 正常输出
    err => console.error(err),     // 不会触发
);
// 超过指定时间
seconds.pipe(timeout(900))
.subscribe(
  value => console.log(value), 
  err => console.error(err) // 直接报错 TimeoutErrorImpl {message: "Timeout has occurred", name: "TimeoutError"}
);
```

也可以指定未来的某个```Date```

```typescript
import { interval } from 'rxjs';
import { timeout } from 'rxjs/operators';

interval(1000).pipe(
  timeout(new Date("December 17, 2020 03:24:00")),
).subscribe(
    value => console.log(value), // 2020-12-17 03:24:00 前不会报错
    err => console.log(err)      // 到了2020-12-17 03:24:00就会开始报错了
);
```

### timeoutWith

在指定时间内，不发出值就推送另一个 ```Observable``` 

```typescript
const seconds = interval(1000);
const minutes = interval(500);

// seconds太慢将会推送minutes流
seconds.pipe(timeoutWith(1100, minutes))
  .subscribe(value => console.log(value));
```

## 错误处理类操作符

错误是开发中不幸的副作用。这些操作符提供了一些高效的方式来优雅地处理错误并且在它们应该发生的情况下重试逻辑。

之前演示过，如果 ```Observable``` 内部发出错误，只会进入 ```error```回调。

```typescript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
  map(n => {
    if (n === 4) {
      throw new Error('four err!');
    }
    return n;
  })
).subscribe(
  x => console.log(x), // 输出：1 2 3
  error => console.error('err', error),
  () => console.log('complete')
);
```

可以通过一些操作符改变这行为：

### catchError

- 无视错误，返回一个新的 ```Observable``` ：

```typescript
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
  map(n => {
    if (n === 4) {
      throw new Error('four err!');
    }
    return n;
  }),
  catchError(err => of('I', 'II', 'III', 'IV', 'V')),
).subscribe(
  x => console.log(x), // 输出：1 2 3 I II III IV V
  error => console.error('err', error), // 不会走这里
  () => console.log('complete')
);
```

- 重试错误

```typescript
import { of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
  map(n => {
    if (n === 4) {
      throw new Error('four err!');
    }
    return n;
  }),
  catchError((err, caught) => caught),
  take(10),
).subscribe(x => console.log(x)); // 输出1 2 3，然后重试，一直输出10数值
```

- 也可以抛出一个新的错误

```typescript
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
  map(n => {
    if (n === 4) {
      throw new Error('four err!');
    }
    return n;
  }),
  catchError(err => {
    throw new Error('error in source. Details: ' + err);
  }),
)
  .subscribe(
    x => console.log(x),
    err => console.error('err ', err),
    () => console.log('complete') // 不会走这里
  );
```

### retry

发生错误后重试指定次数

```typescript
import { interval, of } from 'rxjs';
import { mergeMap, retry } from 'rxjs/operators';

const source = interval(1000);
const example = source.pipe(
  mergeMap(val => {
    if (val > 2){
      return throwError('Error!');
    }
    return of(val);
  }),
  // 重试两次
  retry(2)
);
// 输出两次0 1 2 然后走error回调
const subscribe = example.subscribe({
  next: val => console.log(val),
  error: val => console.error('err ', `${val}: Retried 2 times then quit!`)
});
```

### retryWhen

发生错误后 自定义重试策略，参数是个回调函数，返回 ```Observable``` 

```typescript
import { interval, of } from 'rxjs';
import { delay, tap, retryWhen } from 'rxjs/operators';

const source = interval(1000);
const example = source.pipe(
  map(val => {
    if (val > 2) {
      // 错误将由 retryWhen 接收
      throw val;
    }
    return val;
  }),
  retryWhen(errors =>
    errors.pipe(
      // 输出错误信息
      tap(val => console.log(`Value ${val} 太大了!`)),
      // 3秒后重试
      delay(3000)
    )
  )
);
const subscribe = example.subscribe(
  val => console.log(val),
  error => console.error('err ', error)
);
```

## 数字类操作符

一些跟数字有关的操作符

### count

计算源 ```Observable``` 推送的个数

```typescript
import { fromEvent, interval } from 'rxjs';
import { count, takeUntil } from 'rxjs/operators';

interval(500).pipe(
  takeUntil(fromEvent(document, 'click')),
  count()
).subscribe(
  res => console.log(res)
); // interva一直运行，直到点击页面，输出点击之前推送数据的个数
```

增加判断条件

```typescript
import { range } from 'rxjs';
import { count } from 'rxjs/operators';

const numbers = range(1, 7).pipe(
  count(i => i % 2 === 1)
).subscribe(
  x => console.log(x)
); // 打印出单数的个数
```

### max/min

求源 ```Observable``` 发出的最大/最小值

```typescript
import { of } from 'rxjs';
import { max, min } from 'rxjs/operators';

of(5, 4, 7, 2, 8).pipe(
  // min()
  max()
).subscribe(x => console.log(x)); // -> 8
```

也可以自定义比较规则

```typescript
interface Person {
  age: number;
  name: string;
}
import { of } from 'rxjs';
import { max, min } from 'rxjs/operators';

of<Person>(
  {age: 5, name: 'Jack'},
  { age: 8, name: 'Rose'},
  { age: 12, name: 'Bob'}
).pipe(
  // 这里如果 -1 和 1 的位置对换，则求出的是最小值
  // min<Person>((a: Person, b: Person) => a.age > b.age ? 1 : -1)
  max<Person>((a: Person, b: Person) => a.age > b.age ? 1 : -1)
).subscribe(
  (res: Person) => console.log(res.name)
); // 输出： Bob
```
