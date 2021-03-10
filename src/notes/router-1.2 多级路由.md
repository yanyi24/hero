# 多级路由

> 多级路由，又称子路由，是前端框架中不可或缺的一部分。

## 多级路由

前面我们已经有了一个用户的列表，这次我们的需求是: 点击每个用户数据，展示详情信息在本页面。

先创建一个 ```user``` 组件，用来展示详情信息：

```shell
ng g c components/router-study/user/user -s -t -c OnPush --flat
```

1. 使用 ```children``` 配置子路由：

```typescript
// router-study-routing.module.ts
import {UserComponent} from './user/user/user.component';
const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: ':id',
        component: UserComponent
      }
    ]
  },
];
```

2. ```users``` 页面中设置跳转并预留路由出口：

```typescript
// users.component.ts
  template: `
    <h3>User page</h3>
    <ul class="list-group">
      <li
        class="list-group-item"
        [class.active]="item.id === selectedId"
        *ngFor="let item of users$ | async"
        (click)="onSelected(item.id)"
        <!--   这里使用相对导航形式     -->
        [routerLink]="[item.id]">
        {{ item.name }}
      </li>
    </ul>
    <hr>
    <router-outlet></router-outlet>
  `
```

3. ```user``` 组件中获取数据并渲染：

```typescript
// user.component.ts
@Component({
  selector: 'app-user',
  template: `
    <div *ngIf="user$ | async as user">
      <h4>{{user.name}}</h4>
      <p><span>{{user.username}}</span> | Email: <span>{{user.email}}</span></p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  user$: Observable<User>;
  constructor(private userServe: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(
      switchMap(params => this.userServe.getUser(params.id))
    );
  }
}
```

如此，我们就创建了一个完整的子路由：

![router3-1.gif](./images/router3-1.gif)

### 无组件路由

目前为止，我们每一条路由信息都配置了 ‘```component```’ 参数，其实， 如果没有配置对应的跳转组件也是可以的。

修改前面的 ```users``` 路由：

```typescript
// router-study-routing.module.ts
import {UserComponent} from './user/user/user.component';
const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersComponent,
        children: [
          {
            path: ':id',
            component: UserComponent
          }
        ]
      }
    ]
  },
];
```

其实这样配置最后的效果跟以前是没有区别的，目前为止，我所知道这样配置优点是**利于配置路由守卫**。（后面会遇到）

## 命名路由

目前为止，我们所有的路由的出口（```outlet```）都是一个默认的 ```outlet``` 标签，其实，路由可以指定具体某个 ```outlet``` 标签为出口。

生成一个 ```tips``` 组件作为演示：

```shell
ng g c components/router-study/tips -t -s -c OnPush --flat
```

1. 设置跳转入口、预留命名出口（```outlet```）:

```typescript
// router-study.component.ts
template: `
   <div class="container">
     ...
      <ul class="nav nav-pills">
       ...
       <li class="nav-item">
         <!--  意思是将tips组件插入到名叫tip出口    -->
         <a class="nav-link"  [routerLink]="[{outlets: {tip: ['tips']}}]" routerLinkActive="active">to tips</a>
         <!--  或者使用函数式跳转    -->
         <!--  <a class="nav-link"  (click)="goTips()">to tips</a>   -->
       </li>
     </ul>
     <router-outlet></router-outlet>
     <!--  取名为tip    -->
     <router-outlet name="tip"></router-outlet>
   </div>
 `
...
// 函数式跳转
goTips(): void {
  this.router.navigate([{outlets: {tip: ['tips']}}]);
}
```

2. 配置命名路由：

```typescript
// router-study-routing.module.ts
const routes: Routes = [
  {path: 'comments', component: CommentsComponent},
  {path: 'comment/:id', component: CommentComponent},
  {
    path: 'tips',
    component: TipsComponent,
    outlet: 'tip' // 这里就是出口的名字
  }
];
```

3. 修改组件模板内容：

```typescript
// tips.component.ts
@Component({
  selector: 'app-tips',
  template: `
    <div class="tips">
      <p>tips content!!!!</p>
      <div class="btn-group">
        <button class="btn btn-small btn-primary" (click)="onOk()">OK</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipsComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {}
  // 这里的关闭是直接从DOM中移除
  onOk(): void {
    this.router.navigate([{ outlets: { tip: null }}]);
  }
}
```

![router3-2.gif](./images/router3-2.gif)

从最后的结果可以看出：

- ```URL``` （```http://localhost:4200/users/4(tip:tips)```） 中包含一个主路由 ```users``` 及第二个路由 (```tip:tips```)，出口名 ```tip``` 和路径 ```tips``` ；

- 第二个路由会一直存在与```DOM```结构中，直到关闭；

- 命名路由与其他路由组合使用，且相互独立。

## 总结

1. 多级路由使用 ```children``` 数组进行配置，可以无限嵌套，与出口配套使用；

2. 路由跳转支持相对路径导航； 

3. 命名路由跳转方式可以是 ```[routerLink]="[{outlets: {tip: ['tips']}}]``` 或者 ```this.router.navigate([{outlets: {tip: ['tips']}}]);``` ，销毁则设置成 ```null``` :``` this.router.navigate([{ outlets: { tip: null }}]);```










