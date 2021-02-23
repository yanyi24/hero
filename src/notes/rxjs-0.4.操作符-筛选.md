# rxjs-操作符-筛选类

> 这一节我们介绍筛选类操作符

## 筛选操作符

在基于推送的方式下，选择接受项的方式和时间很重要。这些操作符提供了从 ```observable``` 源中接受值和处理```backpressure``` (背压)的技术。

### audit

在目标 ```observable``` 发出值之前，会忽略所有源 ```observable``` 发出的值，直到目标 ```observable``` 发出值，会推送源 ```observable``` 最近发出的一次值。

```typescript
import { interval, fromEvent } from 'rxjs';
import { audit, pluck } from 'rxjs/operators';

const clicks = fromEvent(document, 'click').pipe(pluck('clientX'));
const result = clicks.pipe(audit(ev => interval(2000)));
// 如果不停的点击页面，会等interval发出流之后，才会发射出离2秒最近的一次点击位置
result.subscribe(x => console.log(x));
```

### auditTime

如果只想单纯的控制时间，上例可重写为：

```typescript
import { interval, fromEvent } from 'rxjs';
import { auditTime, pluck } from 'rxjs/operators';

const clicks = fromEvent(document, 'click').pipe(pluck('clientX'));
const result = clicks.pipe(auditTime(2000));
result.subscribe(x => console.log(x));
```

### debounce

当源 ```Observable``` 的发射间隔大于指定 ```timer``` 时，才会发出最近的一次值

与 ```audit``` 的区别是：

- ```audit```是否发出值取决于```timer```是否发出值
  
- ```debounce```是否发出值取决源```Observable```的发射间隔是否大于给定的```timer```

```typescript
import { interval, fromEvent } from 'rxjs';
import { debounce, pluck } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(debounce(() => interval(1000)));
// 如果一直连续点击（间隔小于1秒），则不会发射最后一次之前的流
result.subscribe(x => console.log(x));
```

### debounceTime

类似```debounce```，上例可重写为：

```typescript
import { interval, fromEvent } from 'rxjs';
import { debounceTime, pluck } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(debounceTime(1000));
result.subscribe(x => console.log(x));
```

### distinct

依次发出源 ```Observable``` 的值，只是每次只发出与之前不同的值(或者之前从没出现过的值)。

```typescript
interface Person {
  age: number,
  name: string
}
import { of } from 'rxjs';
import { distinct } from 'rxjs/operators';

of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1).pipe(
  distinct()
).subscribe(x => console.log(x)); // 1, 2, 3, 4

//还可以指定过滤函数
of<Person>(
  { age: 4, name: 'Foo'},
  { age: 7, name: 'Bar'},
  { age: 5, name: 'Foo'},
).pipe(
  distinct((p: Person) => p.name),
).subscribe(
  x => console.log(x)
); // 输出：{ age: 4, name: 'Foo'} { age: 7, name: 'Bar'},
```

### distinctUntilChanged

当源```Observable```发出了**与上一次不同**的值时，才把当前值推送出去。

```typescript
import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4).pipe(distinctUntilChanged())
  .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4

// 同样可以指定过滤函数
of<Person>(
  { age: 4, name: 'Foo'},
  { age: 7, name: 'Bar'},
  { age: 5, name: 'Foo'},
  { age: 6, name: 'Foo'},
).pipe(
  distinctUntilChanged((p: Person, q: Person) => p.name === q.name),
).subscribe(
  x => console.log(x)
); // 输出：{ age: 4, name: 'Foo'} { age: 7, name: 'Bar'} { age: 5, name: 'Foo'}
```

### distinctUntilKeyChanged

当源```Observable```发出的值，它的```key```与上一次值的```key```不同时，才把当前值推送出去。上面的示例可以改写成这样：

```typescript
import { of } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

of<Person>(
    { age: 4, name: 'Foo'},
    { age: 7, name: 'Bar'},
    { age: 5, name: 'Foo'},
    { age: 6, name: 'Foo'},
  ).pipe(
    distinctUntilKeyChanged('name'),
  )
  .subscribe(x => console.log(x));
```

如果想更精细的匹配：

```typescript
import { of } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

of<Person>(
    { age: 4, name: 'Foo1'},
    { age: 7, name: 'Bar'},
    { age: 5, name: 'Foo2'},
    { age: 6, name: 'Foo3'},
  ).pipe(
    // 如果name前3个字符相同
    distinctUntilKeyChanged('name', (x: string, y: string) => x.substring(0, 3) === y.substring(0, 3)),
  )
  .subscribe(x => console.log(x));
```

### elementAt

发出指定索引的那个值。

```typescript
import { fromEvent } from 'rxjs';
import { elementAt } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(elementAt(2));
// 只输出索引为2的那次点击，也就是第三次点击
result.subscribe(x => console.log(x));
```

### ignoreElements

忽略源```Observable```发出的所有值，直接```complete``` 。

```typescript
import { of } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';

of('you', 'talking', 'to', 'me').pipe(
  ignoreElements()
).subscribe(
  word => console.log(word),
  err => console.log('error:', err),
  () => console.log('the end')
); // 输出： the end 
```

### filter

类似数组的```filter``` 。

```typescript
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const clicksOnDivs = clicks.pipe(filter(ev => (ev.target as HTMLElement).tagName === 'DIV'));
// 只有点击 div 才发射出流
clicksOnDivs.subscribe(x => console.log(x));
```

### first

只取第一个发出的值

```typescript
import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(first());
// 只有第一次点击才发射流
result.subscribe(x => console.log(x));
```

也可以指定第一个值符合的条件：

```typescript
import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(first(ev => ev.target.tagName === 'DIV'));
// 只有第一次点击 div 才发射流
result.subscribe(x => console.log(x));
```

### last

只取最后一个值

```typescript
import { last } from 'rxjs/operators';

of('you', 'talking', 'to', 'me').pipe(
  last()
).subscribe(res => console.log(res)); // 输出： me
```

同样可以更精细的筛选：

```typescript
import { last } from 'rxjs/operators';

of('you', 'talking', 'to', 'me').pipe(
  last(value => value.includes('talk'))
).subscribe(res => console.log(res)); // 输出： talking
```

### sample

忽略源```Observable```发出的值，直到另一个```Observable```发出值，才推送源```Observable```最近发出的值。
```typescript
import { fromEvent, interval } from 'rxjs';
import { sample } from 'rxjs/operators';

const seconds = interval(1000);
const clicks = fromEvent(document, 'click');
const result = seconds.pipe(sample(clicks));
// interval一直在运行，但是只有在点击的时候，才发射出最新的interval的值
result.subscribe(x => console.log(x));
```

### sampleTime

每隔指定的时间发出最近的一个值

```typescript
import { fromEvent } from 'rxjs';
import { sampleTime } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(sampleTime(3000));
// 每隔3秒发出最近的一个值
result.subscribe(x => console.log(x));
```

### single

类似```first```，发出第一个值，但是如果源```Observable```有多个值，就会直接进入```error```。

```typescript
import { range } from 'rxjs';
import { single } from 'rxjs/operators';

const numbers = range(1, 5).pipe(single());
// 因为有5个值，所以直接走error
numbers.subscribe(x => console.log('never get called'), e => console.error('error'));
```

```typescript
import { range } from 'rxjs';
import { single } from 'rxjs/operators';

const numbers = range(1).pipe(single());
// get result 0
numbers.subscribe(x => console.log('get result', x), e => console.error('error'));
```

也可以指定过滤函数, 筛选出的结果必须只有一个符合的值，否则也是直接进入```error``` 。

```typescript
import { range } from 'rxjs';
import { single } from 'rxjs/operators';

const numbers = range(1, 5).pipe(single(item => item === 3));
// 只有一个3，所以输出：get result 3
numbers.subscribe(x => console.log('get result', x), e => console.error('error'));

const numbers2 = range(1, 5).pipe(single(item => item > 3));
// 大于3的数不止一个，所以error
numbers2.subscribe(x => console.log('get result', x), e => console.error('error'));
```

### skip

跳过前面n个值开发推送数据

```typescript
import { interval } from 'rxjs';
import { skip } from 'rxjs/operators';

const source = interval(1000);
const example = source.pipe(skip(5));
// 等5秒从5开始输出
const subscribe = example.subscribe(val => console.log(val));
```

### skipLast

忽略最后n个值

```typescript
import { range } from 'rxjs';
import { skipLast } from 'rxjs/operators';

const many = range(1, 5);
const skipLastTwo = many.pipe(skipLast(2));
// 输出：1 2 3
skipLastTwo.subscribe(x => console.log(x));
```

### skipUntil

一直忽略源```Observable```发出的值，直到另一个```Observable```发出值为止。

```typescript
import { interval, fromEvent } from 'rxjs';
import { skipUntil } from 'rxjs/operators';

const intervalObservable = interval(1000);
const click = fromEvent(document, 'click');
const emitAfterClick = intervalObservable.pipe(skipUntil(click));
// interval 一直运行，只有点击后，才发射出值后续值
// 如果在4.6s时点击. 输出: 5...6...7...8....
// 继续点击，不产生任何影响
const subscribe = emitAfterClick.subscribe(value => console.log(value));
```

### skipWhile

忽略所有符合条件的值

```typescript
import { interval } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

const source = interval(1000);
const example = source.pipe(skipWhile(val => val < 5));
// 会忽略前5个值，也就是从5开始打印
const subscribe = example.subscribe(val => console.log(val));
```

### take

只取前n个值

```typescript
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const intervalCount = interval(1000);
const takeFive = intervalCount.pipe(take(5));
// 输出：0 1 2 3 4
takeFive.subscribe(x => console.log(x));
```

### takeLast

只取最后n个值

```typescript
import { range } from 'rxjs';
import { takeLast } from 'rxjs/operators';

const many = range(1, 100);
const lastThree = many.pipe(takeLast(3));
lastThree.subscribe(x => console.log(x));
```

### takeUntil

不断推送源```Observable```发出的值，直到另一个```Observable```发出值为止。

```typescript
import { interval, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const source = interval(1000);
const clicks = fromEvent(document, 'click');
const result = source.pipe(takeUntil(clicks));
// interval一直发射出值，直到点击，就结束发射值
result.subscribe(x => console.log(x));
```

### takeWhile

只取符合条件的值。

```typescript
import { range } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

const source = range(1, 8);
const example = source.pipe(takeWhile(val => val <= 4));
// 只输出<=4的值
const subscribe = example.subscribe(val => console.log(val));
```

### throttle

忽略源```Observable```发出的值，直到另一个```Observable```发出值，才会把最近的一次值推送出去

```typescript
import { interval } from 'rxjs';
import { throttle } from 'rxjs/operators';

const interval$ = interval(500);
const result = interval$.pipe(throttle(ev => interval(2000)));
// interval一直运行，每隔2秒打印出interval的最新值。
result.subscribe(x => console.log(x));
```

配置项：

```typescript
// 这个会影响第一个值的输出。这两个值互斥
const defaultThrottleConfig: ThrottleConfig = {
  leading: true,  // 是否每次节流开始前调用
  trailing: false // 是否每次节流开始后调用
};
```

### throttleTime

类似```throttle```，上面例子可重写为：

```typescript
import { interval } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

const interval$ = interval(500);
const result = interval$.pipe(throttleTime(2000));
result.subscribe(x => console.log(x));
```
