import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injectable,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import {from, fromEvent, Observable, of, throwError} from 'rxjs';
import jsonpG from 'jsonp-good';
import {catchError, debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';

interface BaiduRes {
  q: string;
}

@Injectable()
class BaiduService {
  readonly url = 'https://www.baidu.com/sugrec';
  list(wd: string): Observable<BaiduRes[]> {
    // 因为这个插件返回的是Promise，所以用from转换
    return from(jsonpG({
      url: this.url,
      funcName: 'jQuery110203052522071732855_1604236886158',
      params: {
        prod: 'pc',
        from: 'pc_web',
        wd
      }
    }).then((res: {g: BaiduRes[]}) => res.g));
  }
}

@Component({
  selector: 'app-rxjs-demo',
  template: `
    <div class="container">
      <div class="autocomplete mt-2">
        <input #input class="form-control" placeholder="search..." />
        <ul class="list-group mt-2">
          <li class="list-group-item" *ngFor="let item of resList">{{item?.q}}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BaiduService]
})
export class RxjsDemoComponent implements OnInit, AfterViewInit {
  @ViewChild('input', {static: true}) private inputEl: ElementRef;
  resList: BaiduRes[];
  constructor(private baiduServer: BaiduService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    fromEvent(this.inputEl.nativeElement, 'input').pipe(
      debounceTime(500), // 键入0.5秒后输出值，并忽略0.5秒间隔内的输入
      pluck('target', 'value'),
      distinctUntilChanged(), // 只有本次value与上一次value不一致时才发射数据
      // 每一次请求之前会取消上一次的请求
      switchMap((value: string) => value.length ? this.baiduServer.list(value) : of([])),
      catchError(err => throwError(err))
    ).subscribe(
      res => {
        this.resList = res;
        this.cdr.markForCheck(); // 手动变更检测
      },
        error => console.error(error)
    );
  }
}
