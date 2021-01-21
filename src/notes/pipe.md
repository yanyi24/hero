# Pipe

> 管道，通过逻辑简单处理模板中数据的一种方式，用法简单，是开发中很重要的简化代码的利器。

**元数据说明**

- ```name: string``` --在模板中绑定时使用的管道名。 通常使用 ```lowerCamelCase``` 拼写方式，因为名字中不允许包含减号（```-```）。

- ```pure?: boolean``` --为 ```true``` 时，该管道是纯管道，也就是说 ```transform()``` 方法只有在其输入参数变化时才会被调用。管道默认都是纯管道。

**用法**

```html
{{ exp | myPipe }}
```

## 内置管道

```Angular```有很多内置管道供我们使用，下面是常用的内置管道（[更多](https://angular.cn/api/common#pipes)）：

- [AsyncPipe](https://angular.cn/api/common/AsyncPipe) --自动订阅模板中的```Observable```或```Promise```
- [DatePipe](https://angular.cn/api/common/DatePipe) --根据区域设置规则格式化日期值。
- [DecimalPipe](https://angular.cn/api/common/DecimalPipe) --数字转字符串，并可以指定格式
- [KeyValuePipe](https://angular.cn/api/common/KeyValuePipe) --使```ngFor```可以循环```Object```或```Map```对象
- [JsonPipe](https://angular.cn/api/common/JsonPipe) --把一个值转换成```JSON```字符串格式。在调试时很有用。
- [TitleCasePipe](https://angular.cn/api/common/TitleCasePipe) --把首字母大写，其它小写
- [SlicePipe](https://angular.cn/api/common/SlicePipe) --截取```Array```或```String```
- [PercentPipe](https://angular.cn/api/common/PercentPipe) --数字转百分比
- [LowerCasePipe](https://angular.cn/api/common/LowerCasePipe)和[UpperCasePipe](https://angular.cn/api/common/UpperCasePipe) --转化小写或大写


### KeyValuePipe

以前我们```ngFor```的时候都是循环的数组，通过```KeyValuePipe```，我们可以循环```Object```或```Map```对象。

创建```pipe```组件：

```
ng g c components/pipe -s
```

创建普通对象以及Map对象：

```typescript
// pipe.component.ts
...
export class PipeComponent implements OnInit {
  obj:{[key: number]: string} = {2: 'foo', 1: 'bar'};
  map = new Map([[2, 'foo'], [1, 'bar']]);
  ...
}
```

循环：

```html
<!-- pipe.component.html -->
<div class="pipe">
  <div *ngFor="let item of obj | keyvalue">
    {{item.key}}: {{item.value}}
  </div>
  <div *ngFor="let item of map | keyvalue">
    {{item.key}}: {{item.value}}
  </div>
</div>
```

## 自定义管道

> 下面定义一个将数字指数化的管道```exponentialStrength```。如```{{5 | exponentialStrength: 3}}```，表示```5的3次方```

```
ng g p pipe/exponentialStrength
```

tips: 执行上面的命令后，```cli```工具会自动引入相应模块

