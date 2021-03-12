import { Injectable } from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  // 记录预加载的模块
  preloadedModules: string[] = [];
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) { // 使用预加载的条件
      this.preloadedModules.push(route.path);
      // 最重要的就是返回这个方法
      return load();
    } else {
      return of(null);
    }
  }
}
