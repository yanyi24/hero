> 在任何js框架下，获取元素都是常用且重要的操作。这一节，我们将介绍Angular中如何使用```ViewChild```来获取```DOM```元素、组件、指令。

在这之前，我们需要先了解一个Angular的生命周期函数```AfterViewInit```

## AfterViewInit

定义：一个生命周期钩子，会在 Angular 完全初始化了组件的视图后调用。

在组件中注入这个钩子函数后，就必须实现它的方法```ngAfterViewInit()```。（不用担心，编辑器会提示你的）

### ngAfterViewInit()

一个回调方法，它会在 Angular 完成了组件视图的初始化逻辑之后立即调用。 在视图初始化完成之后，它只会调用一次。

## ViewChild

官方定义：属性装饰器，用于配置一个视图查询。变更检测器会在视图的```DOM```中查找能匹配上该选择器的第一个元素或指令。 如果视图的```DOM```发生了变化，出现了匹配该选择器的新的子节点，该属性就会被更新。

通俗的来讲，就是能及时的获取模板中的元素（```DOM```元素、组件、指令）。

> tips:我们将新建一个```view-child```组件来展示本节全部代码

### 获取普通dom

修改```view-child```组件html代码:

```html
<!-- view-child.component.html -->
<section>
  <h3>获取dom</h3>
  <div class="box" #box>
    <p>box</p>
  </div>
</section>
```

***提醒：上面代码给```class```名为```box```的```div```添加了```#box```标识，这样的作用有点类似给元素添加了一个```id```值。***

首先，给```ViewChildComponent```这个类注入```AfterViewInit```这个钩子函数：

```typescript
// view-child.component.ts
export class ViewChildComponent implements OnInit, AfterViewInit {}
```
这个时候，你会发现编辑器会报错，所以，你需要按照编辑器提示来引入```AfterViewInit```，并且实现```ngAfterViewInit```这个接口。

```typescript
// view-child.component.ts
import { AfterViewInit, Component, OnInit } from '@angular/core';
...
export class ViewChildComponent implements OnInit, AfterViewInit {
  constructor() { }
  ngAfterViewInit(): void {}
  ngOnInit(): void {}
}
```

接下来，我们通过获取页面上```#box```来判断```constructor```、```ngAfterViewInit```、```ngOnInit```调用时机:

```typescript
// view-child.component.ts
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
...
export class ViewChildComponent implements OnInit, AfterViewInit {
  // 定义私有属性boxEl，是ElementRef类型。
  @ViewChild('box') private boxEl: ElementRef;
  constructor() { 
    console.log('constructor', this.boxEl);
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.boxEl);
  }
  ngOnInit(): void {
    console.log('ngOnInit', this.boxEl);
  }
}
```

浏览器控制台日志如下：

![ViewChild4](./images/ViewChild4.jpg)

可以得出结论：

1. 三个函数调用顺序是：```constructor``` > ```ngOnInit``` > ```ngAfterViewInit```;

2. 默认在变更检测之后才会获取到元素，而```ngAfterViewInit```就是在变更检测之后才会调用。

> tips: 所谓变更检测，大概意思是Angular每次更新视图前会去检测内部逻辑的变化，只更新有变化的部分。

### static属性

> 默认在变更检测之后才会获取到目标元素，可开启static，这样组件初始化的时候，变更检测前就能获取到目标