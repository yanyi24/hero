# ngIf、ngSwitch、ngForOf

> 这一节，我们将介绍angular内置指令：ngIf、ngSwitch、ngForOf。这也是日常开发中经常会遇到的常见指令。

## ngIf

> ngIf是内置的结构型指令，控制宿主元素的添加或删除，取决于绑定的值是否为真。（跟vue的v-if是类似的，不是控制display属性）

## 单独使用ngIf

```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-ng-if',
  template: `
    <div *ngIf="condition">condition为真是显示</div>
  `,
})
export class NgIfComponent implements OnInit {
  condition = true;
  ...
}
```

> ngIf可以用于任何HTML元素。 *ngIf是个语法糖，上个例子完整的写法如下：

```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-ng-if',
  template: `
    <ng-template [ngIf]="condition">
      <div>condition为真是显示</div>
    </ng-template>
  `,
})
export class NgIfComponent implements OnInit {
  condition = true;
  // ...
}
```
> **ng-template是一块内嵌模板，类型是[TemplateRef](https://angular.cn/api/core/TemplateRef)。（跟vue的<code>template</code>类似）

当然，我们平时根本就不着这么写，简写*ngIf足矣。

### 配合ngIfElese使用

```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-ng-if',
  template: `
    <button class="btn btn-primary btn-small" (click)="condition = !condition">切换condition</button>
    <div *ngIf="condition; else elseBlock">condition为真是显示</div>
    <ng-template #elseBlock>
      <div>condition为假是显示</div>
    </ng-template>
  `,
})
export class NgIfComponent implements OnInit {
  condition = true;
  ...
}
```

这里需要注意的是：上面例子中的elseBlock并非组件中的某变量，而是TemplateRef的引用。（***不带***<code>#</code>）

### 使用TemplateRef

> 上面示例中的else后面跟的变量都是模板的引用而非组件中的变量，下面演示怎么用组件中的变量:

```typescript
// 1、引入TemplateRef、ViewChild
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ng-if',
  template:  `
    <button class="btn btn-primary btn-small" (click)="condition = !condition">切换condition</button>
    <div *ngIf="condition; else elseBlocks">condition为真是显示</div>
    <ng-template #otherTel>
      <div>condition为假是显示</div>
    </ng-template>
  `,
})
export class NgIfComponent implements OnInit {
  condition = true;
  // 2、生命一个TemplateRef类型的变量
  elseBlocks: TemplateRef<any> = null; 
  // 3、将页面上的引用为otherTel的template赋值给变量otherTemplate。
  // @ViewChild() 现在可以理解为：是获取页面元素的一种方式，后面会详细介绍
  @ViewChild('otherTel', { static: true }) otherTemplate: TemplateRef<any> = null;

  // ...

  ngOnInit(): void {
    // 4、给声名的变量elseBlocks赋值为otherTemplate
    this.elseBlocks = this.otherTemplate;
  }
}
```

> 问：为什么我们需要使用变量的形式来进行条件筛选呢？
> 
> 答：相较于模板的引用，变量的形式可以更加灵活。我们可以根据不同的需求，给<code>elseBlocks</code>赋予不同的值，而模板引用的形式只能是写死的一段内容。

## ngSwitch

> ngSwitch是内置的结构型指令，控制显示哪个模版，类似js中的switch

```typescript
...
@Component({
  selector: 'app-ng-switch',
  template: `
    <p>
      <input type="radio" name="fruit" value="apple" id="apple" [(ngModel)]="fruit" />
      <label for="apple">🍎</label>
    </p>
    <p>
      <input type="radio" name="fruit" value="pear" id="pear" [(ngModel)]="fruit" />
      <label for="pear">🍐</label>
    </p>
    <p>
      <input type="radio" name="fruit" value="other" id="other" [(ngModel)]="fruit" />
      <label for="other">other</label>
    </p>
    选择的水果: {{ fruit }}
    <div class="content" [ngSwitch]="fruit">
      <p *ngSwitchCase="'apple'">这是苹果</p>
      <p *ngSwitchCase="'pear'">这是梨</p>
      <p *ngSwitchDefault>啥都不是</p>
    </div>
  `,
})
export class NgSwitchComponent implements OnInit {
  fruit = '';
  // ...
}
```

> 这个其实比较简单，但是需要注意写法：<code>[ngSwitch]="变量"</code> <code>*ngSwitchCase="'字符串'"</code>

## NgForOf

> ngForOf,列表渲染，对比vue，跟v-for类似

### 基础用法

```typescript
import { Component, OnInit } from '@angular/core';
const Heros: Hero[] = [
  {id: 'hero_0', name: '盖伦'},
  {id: 'hero_1', name: '赵信'},
  {id: 'hero_2', name: '嘉文'},
  {id: 'hero_3', name: '易大师'},
];
interface Hero {
  id: string;
  name: string;
}

@Component({
  selector: 'app-ng-for',
  template: `
    <ul>
      <li *ngFor="let item of heros">{{ item.id }}</li>
    </ul>
  `,
})
export class NgForComponent implements OnInit {
  heros: Hero[] = Heros;
  //...
}
```

> **注意点：**
> 1、<code>*ngFor=""</code>
> 2、<code>let * of *</code> (vue使用的是：<code>in</code>)

### 局部变量

NgForOf 导出了一系列值，可以指定别名后作为局部变量使用：

- <code>$implicit: T</code>：迭代目标（绑定到ngForOf）中每个条目的值。
- <code>ngForOf: NgIterable<T></code>：迭代表达式的值。当表达式不局限于访问某个属性时，这会非常有用，比如在使用 async 管道时（userStreams | async）。
- <code>index: number</code>：可迭代对象中当前条目的索引。
- <code>count: number</code>：可迭代对象的长度。
- <code>first: boolean</code>：如果当前条目是可迭代对象中的第一个条目则为 true。
- <code>last: boolean</code>：如果当前条目是可迭代对象中的最后一个条目则为 true。
- <code>even: boolean</code>：如果当前条目在可迭代对象中的索引号为偶数则为 true。
- <code>odd: boolean</code>：如果当前条目在可迭代对象中的索引号为奇数则为 true。

```typescript
...
@Component({
  selector: 'app-ng-for',
  template: `
    <ul>
      <li *ngFor="let item of heros; let f = first; let l = last; count as len; index as i; let e = even; odd as o">
        <p>first: {{ f }} -- last: {{ l }}</p>
        <p>name: {{ item.name }}</p>
        <p>length: {{ len }}</p>
        <p>index: {{ i }}</p>
        <p>even: {{ e }}</p>
        <p>odd: {{ o }}</p>
        <hr />
      </li>
    </ul>
  `,
})
...
```

> 从上面可以看出，局部变量可以采取<code>let</code>及<code>as</code>方式赋值，使用时用变量名。

### trackBy

> 当迭代器的内容变化时，<code>NgForOf</code>会对<code>DOM</code>做出相应的修改。但是，如果其中有内容根本没有发生变化呢？我们是不需要全部更新修改<code>DOM</code>的，从而节省开销。
>
> <code>trackBy</code>就是解决这个问题的法宝。<code>trackBy</code>接收一个函数，返回 <code>ngFor</code>应该跟踪的值（比如<code>id</code>），这样刷新列表时，<code>id</code>相同的<code>dom</code>不会触发更新

我们将前面的heros数组第二跟第四条数据修改下：

```typescript
@Component({
  selector: 'app-ng-for',
  template: `
    <button class="btn btn-primary" (click)="reset()">重置</button>
    <ul>
      <li *ngFor="let item of heros; trackBy: trackByHero ">{{ item.name }}</li>
    </ul>
  `,
  styles: [
  ]
})
export class NgForComponent implements OnInit {
  heros: Hero[] = Heros;
 // ...
  reset() {
    this.heros = [
      {id: 'hero_0', name: '盖伦'},
      {id: 'hero_4', name: '赵信2'},
      {id: 'hero_2', name: '嘉文'},
      {id: 'hero_5', name: '易大师2'},
    ]
  }
  trackByHero(hero: Hero) {
    return hero.id;
  }
}
```

页面效果如下：

![trackBy](/Users/macair/Desktop/work-space/angular/hero/src/notes/trackBy.gif)

当我们点击重置的时候，可以看出，第一条跟第三条数据，页面是没有更新的，从而达到节约开销的作用。

> ### 总结
>
> 其实这一节的难度不是很大，需要注意一下几点：
> 
> 1、<code>*ngIf="condition"</code>
>
> 2、<code>[ngSwitch]="变量"</code> <code>*ngSwitchCase=""</code>
>
> 3、<code>*ngFor="let * of *"</code>
>
> 4、局部变量的使用可以让我们的程序更简便
>
> 5、<code>trackBy</code>很重要

感谢B站大佬[**咯咯各哒**](https://space.bilibili.com/142925973?spm_id_from=333.788.b_765f7570696e666f.2)的支持，更多视频教程请访问[B站](https://www.bilibili.com/video/BV1zy4y1k7Dw?p=18&t=15)

