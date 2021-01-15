# NgTemplateOutlet指令

> 前面我们有写过一个```dialog```组件，其中有一个功能点我们是没有实现的，那就是不能传入自定义组件内容。写过vue的兄弟些肯定了解```<solt>```这个标签，这一节，我们了解下```NgTemplateOutlet```结构指令，功能类似```<solt>```。

#### 需求分析：

- 创建一个子组件，并且有默认内容

- 父组件能够传入自定义内容

- 父组件能够访问子组件内部变量

## ngTemplateOutlet

ngTemplateOutlet是一个结构型指令，能够将一个提前备好的 TemplateRef 插入到页面指定位置。

创建```tpl-outlet```组件：

```
ng g c components/tpl-outlet -s
```

引用组件：

```html
<!-- app.component.html -->
<app-tpl-outlet></app-tpl-outlet>
```

修改组件：

```html
<!-- tpl-outlet.component.html -->
<div class="outlet">
  <h2>NgTemplateOutlet</h2>
  <div class="content">
    <!-- 使用ngTemplateOutlet绑定模板 -->
    <ng-container [ngTemplateOutlet]="defaultTpl"></ng-container>
  </div>
</div>
<ng-template #defaultTpl>
  <p>组件默认内容</p>
</ng-template>
```

页面表现：

![](./images/outlet1.jpg)

想要组件能够引用外部传入的内容，首先应该定义一个输入属性来接收：

```typescript
// tpl-outlet.component.ts
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
...
export class TplOutletComponent implements OnInit {
  // 定义一个叫render的输入属性，并且接收TemplateRef类型的值
  @Input() render: TemplateRef<any>;
  //...
}
```

修改模板，接收变量：

```html
<!-- tpl-outlet.component.html -->
<div class="outlet">
  <h2>NgTemplateOutlet</h2>
  <div class="content">
    <!-- 渲染内容为render的值或者默认内容 -->
    <ng-container [ngTemplateOutlet]="render || render"></ng-container>
  </div>
</div>
<ng-template #defaultTpl>
  <p>组件默认内容</p>
</ng-template>
```

父组件传入自定义内容：

```html
<!-- app.component.html -->
<app-tpl-outlet [render]="outTpl"></app-tpl-outlet>

<ng-template #outTpl>
  <p>外部传入模板内容</p>
</ng-template>
```

页面表现：

![](./images/outlet2.jpg)

## ngTemplateOutletContext

```ngTemplateOutletContext```是一个对象，该对象的```key```可在模板中使用```let```语句进行绑定。可以通过设置```ngTemplateOutletContext```来给```EmbeddedViewRef```(也就是我们这儿的```<ng-container>```)附加一个上下文对象。

组件定义变量：

```typescript
// tpl-outlet.component.ts
...
export class TplOutletComponent implements OnInit {
  // 随便定义的一个对象
  // $implicit是一个可以被默认识别的key值
  ctx = {$implicit: 'default', value: 'context value'}
  //...
}
```

模板绑定```ngTemplateOutletContext```：

```html
<!-- tpl-outlet.component.html -->
<div class="outlet">
  <h2>NgTemplateOutlet</h2>
  <div class="content">
    <ng-container [ngTemplateOutlet]="render || render" [ngTemplateOutletContext]="ctx"></ng-container>
  </div>
</div>
...
```

父组件使用：

```html
<!-- app.component.html -->
<app-tpl-outlet [render]="outTpl"></app-tpl-outlet>

<ng-template #outTpl let-key let-val="value">
  <p>外部传入模板内容 --- 组件内部传过来的变量默认值:{{key}}, value:{{val}}</p>
</ng-template>
```

页面表现：

![](./images/outlet3.jpg)

***因为ctx.$implicit是内部默认识别的一个值，所以在let的时候不用赋值***

同时，在子组件自己的模板上也一样能够访问内部变量：

```html
<ng-template #defaultTpl let-key let-val="value">
  <p>组件默认内容 --- 默认值：{{key}},value:{{val}}</p>
</ng-template>
```

## 简写

既然是个结构型指令，那引用变量方式也可以这样：

```html
<ng-container *ngTemplateOutlet="render || defaultTpl; context: ctx"></ng-container>
```

并且，将指令使用在<ng-template>上也是可以的：

```html
<ng-template *ngTemplateOutlet="render || defaultTpl; context: ctx"></ng-template>
```

## 总结

1. ```ngTemplateOutlet```是一个结构型指令，接收一个```TemplateRef```类型的值；

2. 使用```ngTemplateOutletContext```能够传递组件内部变量，简写直接使用```context```