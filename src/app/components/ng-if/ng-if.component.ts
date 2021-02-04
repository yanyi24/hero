// 1、引入TemplateRef、ViewChild
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ng-if',
  template:  `
  <button class="btn btn-primary btn-small" (click)="condition = !condition">切换condition</button>
  <div *ngIf="condition; else elseBlocks">condition为真是显示</div>
  <ng-template #otherTel>
    <div>condition为假是显示</div>
  </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgIfComponent implements OnInit {
  condition = true;
  // 2、生命一个TemplateRef类型的变量
  elseBlocks: TemplateRef<any> = null; 
  // 3、将页面上的引用为otherTel的template赋值给变量otherTemplate。
  // @ViewChild() 现在可以理解为：是获取页面元素的一种方式，后面会详细介绍
  @ViewChild('otherTel', { static: true }) otherTemplate: TemplateRef<any> = null;
  constructor() { }

  ngOnInit(): void {
    // 4、给声名的变量elseBlocks赋值为otherTemplate
    this.elseBlocks = this.otherTemplate;
  }
}
