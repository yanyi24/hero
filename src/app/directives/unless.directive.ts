import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  private hasView = false; // 视图是否已经显示
  @Input() 
  set appUnless(condition: boolean) { // set用来监听属性变化
    if (!condition && !this.hasView) { // 传入的条件为false并且视图没有显示
      // 创建一个内嵌的视图，并把这个视图插入到一个视图容器中
      this.viewContainer.createEmbeddedView(this.templateRef, {$implicit: condition}); 
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
  // 构造函数中注入
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { 
    console.log(111);
    
  }

}
