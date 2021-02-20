# rxjs-操作符

> 操作符是 ```observables``` 背后的马力，为复杂的异步任务提供了一种优雅的声明式解决方案。

```rxjs```有八种类型的操作符，分别是：组合、条件、创建、错误处理、多播、过滤、转换、工具。我们将通过多节内容来介绍全部常用的操作符。（参考文档：https://rxjs-cn.github.io/learn-rxjs-operators/operators/）

tips:通常情况下，我们是不会通过new Observable() 形式去创建一个可观察对象的，都是使用操作符来创建。

## 创建类型操作符

这些运算符几乎允许你基于任何东西来创建一个 ```observable``` 。

### of 

按顺序发出任意类型和数量的值。

创建简单类型流：

```typescript
import { of } from 'rxjs';
const source$ = of(1, 2, 3, 4, 5);
source$.subscribe(val => console.log(val)); // 输出: 1,2,3,4,5
```

创建复杂类型的流：

```typescript
import { of } from 'rxjs';
const source$ = of({ name: 'Brian' }, [1, 2, 3], function hello() {
  return 'Hello';
});

const subscribe = source$.subscribe(val => console.log(val));
```

![operator1](./images/operator1.jpg)

### from

将数组、 ```promise``` 或迭代器转换成 ```observable``` 。

转数组：

```typescript
import { from } from 'rxjs';
const arraySource$ = from([1, 2, 3, 4, 5]);
// 输出: 1,2,3,4,5
const subscribe = arraySource$.subscribe(val => console.log(val));
```

转 ```Promise``` :

```typescript
import { from } from 'rxjs';
const promiseSource$ = from(new Promise(resolve => resolve('Hello World!')));
// 输出: 'Hello World'
const subscribe = promiseSource$.subscribe(val => console.log(val));
```

转 ```Map``` 对象:

```typescript
import { from } from 'rxjs';
const map = new Map([
  [1, 'hi']
]);
map.set(2, 'Bye');
map.set(3, 'rxjs');
const mapSource$ = from(map);
const subscribe = mapSource$.subscribe(val => console.log(val));
```

![operator2](./images/operator2.jpg)

转字符串:

```typescript
import { from } from 'rxjs';
// 将字符串作为字符序列发出,空格也同样输出
const source$ = from('Hello World');

// 输出: 'H','e','l','l','o',' ','W','o','r','l','d'
source$.subscribe(val => console.log(val));
```

### fromEvent

将事件转换成 observable

```typescript
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

// 创建发出点击事件的 observable
const event$ = fromEvent(document, 'click');
// 先将数据处理一下（获取点击事件发生时的时间戳）
const example = event$.pipe(
  map(event => `Event time: ${event.timeStamp}`)
);
example.subscribe(val => console.log(val));
```

### interval

跟原生类似，基于给定时间间隔发出数字序列。

```typescript
import { interval } from 'rxjs';
// 每1秒发出数字序列中的值
const source$ = interval(1000);
// 数字: 0,1,2,3,4,5....
const subscribe = source$.subscribe(val => console.log(val));
```

### timer

给定持续时间后，再按照指定间隔时间依次发出数字。

```typescript
import { timer } from 'rxjs';
// 1秒后发出0，然后结束
const source$ = timer(1000);
// 输出: 0
const subscribe = source$.subscribe(val => console.log(val));
```

```typescript
import { timer } from 'rxjs';
// 1秒后发出一个值0，然后每两秒继续发出值
const source$ = timer(1000, 2000);
// 输出: 0,1,2,3,4,5......
const subscribe = source$.subscribe(val => console.log(val));
```

### range

依次发出给定区间内的**数字**

```typescript
import { range } from 'rxjs';
// 从2开始，发出5个数字
const numbers$ = range(2, 5);
// 输出: 2 3 4 5 6
numbers$.subscribe(x => console.log(x));
```

```typescript
import { range } from 'rxjs';
// 从0开始，发出4个数字
const numbers$ = range(4);
// 输出: 0 1 2 3
numbers$.subscribe(x => console.log(x));
```

### iif

在被订阅时，根据条件决定, 哪个 ```Observable``` 将被订阅。我们可以看下编辑器对于 ```iff``` 的提示，它可以说明 ```iff``` 所需的参数：

![operator3](./images/operator3.jpg)

```typescript
import { iif } from 'rxjs';
const n = Math.random();
const iff$ = iif(
  () => n > 0.5, /* 判断条件 */
  of('随机数大于0.5'), /* 满足条件，将推送这条流 */
  of('随机数小于0.5') /* 反之，推送这条 */
);
iff$.subscribe(res => console.log(res));
```

## 组合操作符

组合操作符允许连接来自多个 ```observables``` 的信息。（图形示范：https://rxmarbles.com/）

### concat

类似数组的 ```concat``` ，将每个 ```Observable``` 拼接起来，按顺序发出值

```typescript
import {interval, range, concat} from 'rxjs';
import {take} from 'rxjs/operators';
//take(4) 只取流的前4个值
const timer$ = interval(1000).pipe(take(4));
const sequence$ = range(1, 10);
const result = concat(timer$, sequence$);
result.subscribe(x => console.log(x));
```
