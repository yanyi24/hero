# RxJs初体验

> ```RxJS```是一个主要用于处理**异步**程序的函数式编程库，可以把 ```RxJS``` 想成处理异步行为的 ```Lodash```，在```angular```中被大量使用，所以，了解它是必须的。

## 观察对象Observable

在介绍```RxJs```之前，我们有必要先了解下可观察对象（```Observable```）。

1. 观察者（```Observer```）模式是一个软件设计模式，它有一个对象，称之为主体 ```Subject```，负责维护一个依赖项。

2. 可观察对象（```Observable```）是声明式的 —— 也就是说，虽然你定义了一个用于发布值的函数，但是在有消费者订阅它之前，这个函数并不会实际执行。 订阅之后，当这个函数执行完或取消订阅时，订阅者就会收到通知。

3. 作为发布者，你创建一个 ```Observable``` 的实例，其中定义了一个订阅者（```subscriber```）函数。 当有消费者调用 ```subscribe()``` 方法时，这个函数就会执行。

  - 要执行所创建的可观察对象，并开始从中接收通知，你就要调用它的 ```subscribe()``` 方法，并传入一个观察者（```observer```）。 这是一个 ```JavaScript``` 对象，它定义了你收到的这些消息的处理器（```handler```）。 ```subscribe()``` 调用会返回一个 ```Subscription``` 对象，该对象具有一个 ```unsubscribe()``` 方法。 当调用该方法时，你就会停止接收通知。

使用观察者模式大概就是这么个流程，创建可观察对象（```Observable```），定义订阅者（```subscriber```）函数处理逻辑并返回 ```Subscription``` 对象，使用该对象的```unsubscribe()``` 方法取消订阅。

## 函数式编程

首先来与传统的方式作个对比，我们将使用两种不同的方式来实现至少间隔1秒打印鼠标在页面点击位置的功能：

传统写法：

```typescript
ngOnInit(): void {
  let count = 0;
  const rate = 1000;
  let lastClick = Date.now() - rate;
  document.addEventListener('click', event => {
    if (Date.now() - lastClick >= rate) {
      count += event.clientX;
      console.log(count);
      lastClick = Date.now();
    }
  });
}
```

```RxJs```用法：

```typescript
import {fromEvent} from 'rxjs';
import {map, scan, throttleTime} from 'rxjs/operators';
ngOnInit(): void {
  fromEvent(document, 'click').pipe(
    throttleTime(1000),
    map((event: MouseEvent) => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  ).subscribe(
    count => console.log(count)
  );
}
```

tips: 使用```RxJs```，建议使用编辑器自动引入相应的资源（webstorm的自动导入比vscode好用）

从上面的简单的例子可以看出函数式编程的特点：

1. 所有的逻辑均是通过一个个函数实现；

2. 每一个函数都是一个纯函数（不改变数据源），会有一个返回值以供下一步操作使用；

## Observable vs Promise

```Observable```和```Promise```的不同点:

1. 可观察对象(```Observable```)是声明式的，在被订阅之前，它不会开始执行。```Promise```是在创建时就立即执行的。这让```Observable```可用于定义那些应该按需执行的逻辑；

```typescript
class AppComponent {
    newPromise() {
      const p = new Promise(resolve => {
        console.log('initial a promise'); // 立即触发
      });
    }
    newObservable() {
      const o = new Observable(subscriber => {
        console.log('initial a newObservable'); // 不触发
      });
    }
}
```

2. 串联，跟第一条类似，只有当调用```subscribe```方法时，才会执行所有管道函数；

```typescript
class AppComponent {
  newPromise() {
    const p = new Promise(resolve => {
      resolve(['a', 'b', 'c']);
    }).then(res => {
      console.log('第一个then');
      return res;
    }).then(res => {
      console.log('第2个then');
      return res;
    }); // 打印出结果，被解析时自动完成
  }
  newObservable() {
    const o = new Observable(subscriber => {
      console.log('initial a newObservable');
      subscriber.next(['a', 'b', 'c']);
    }).pipe(
      map(res => {
        console.log('第一个map');
        return res;
      }),
      map(res => {
        console.log('第2个map');
        return res;
      })
    );  // 不能打印出结果，不订阅，pipe中的所有函数都不会触发
  }
}
```

3. ```Observable```可以手动取消；

```typescript
const sub = interval(1000).subscribe(res => {
  console.log('interval', res);
});
class App {
  cancelObservable() {
    sub.unsubscribe();
  }
}
```

## Observable vs 事件API

```Observable```的创建与取消：

```typescript
// 创建点击事件 
const clicks$ = fromEvent(buttonEl, ‘click’); 
// 处理逻辑 
const subscription = clicks$.subscribe(e => console.log(‘Clicked’, e));
// 取消订阅 
subscription.unsubscribe();
```

事件API的创建与取消：

```typescript
function handler(e) {
  console.log(‘Clicked’, e);
}
// 处理逻辑
button.addEventListener(‘click’, handler);
// 取消监听
button.removeEventListener(‘click’, handler);
```

## Observable vs 数组

```Observable```会随时间生成值。数组是用一组静态的值创建的。某种意义上，```Observable```是异步的，而数组是同步的。

数组的```concat```方法：

```typescript
const arr1 = ['a', 'b', 'c'];
const arr2 = [1, 2, 3];
console.log(arr1.concat(arr2)); // 众所周知，打印出：["a", "b", "c", 1, 2, 3]
```

```Observable```的```concat```方法：

```typescript
import {concat, from} from 'rxjs';

const arr1$ = from(['a', 'b', 'c']);
const arr2$ = from([1, 2, 3]);
concat(arr1$, arr2$).subscribe(res => {
  console.log(res); // 将会依次打印："a", "b", "c", 1, 2, 3每个元素
});
```

## 总结

1. ```RxJS```是一个主要用于处理**异步**程序的函数式编程库；

2. 可观察对象（```Observable```）没有被订阅就不会执行；

3. 函数式编程让代码逻辑更加清晰。

（tips：从我现在的水平来讲，RxJs对于处理异步数据是很有用的，特别是对数据流时间节点要求较高的操作是会比Promise更加灵活可控的。而且在angular中，随处可见Rxjs，所以，学好它非常有必要，是必须掌握的技能。这个文档也可以看看：https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-00）
