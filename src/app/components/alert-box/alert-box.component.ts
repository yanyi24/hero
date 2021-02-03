import {Component, OnInit, ChangeDetectionStrategy, ComponentFactoryResolver, Injector, ComponentRef, ApplicationRef, EmbeddedViewRef} from '@angular/core';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertBoxComponent implements OnInit {
  // 定义alert组件类型的container
  private container: AlertComponent;
  // 定义ComponentRef类型的变量
  private componentRef: ComponentRef<AlertComponent>;
  constructor(
    private cfr: ComponentFactoryResolver,
    private inject: Injector,
    private appRef: ApplicationRef
  ) { }

  ngOnInit(): void {}
  // 实现按钮点击逻辑
  showAlert() {
    // 判断是否已经创建alert组件
    if(!this.container) {
      this.container = this.createContainer();
    }
    // 传递所需参数
    this.container.setOptions({content: '这是动态创建组件传入的内容', theme: 'success'})
  }
  // 创建
  private createContainer(): AlertComponent {
    /**
     * 1.创建组件工厂：
     * constructor中注入ComponentFactoryResolver这个类
     * 创建指定类型的组件工厂（生产指定类型的组件）
     * */
    const factory = this.cfr.resolveComponentFactory<AlertComponent>(AlertComponent);
    /**
     * 2.工厂创建ComponentRef
     * constructor中注入Injector这个类
     * 根据指定的类型，创建组件的实例
     */
    this.componentRef = factory.create(this.inject);
    /**
     * constructor中注入ApplicationRef这个类
     * 3.将组件试图添加到视图树中，以激活变更检测
     * */
    this.appRef.attachView(this.componentRef.hostView);
    // 4.将组件到模版(包括app-alert标签)，添加到body最后(当然，可以添加到任何位置)
    document.body.appendChild((this.componentRef.hostView as EmbeddedViewRef<{}>).rootNodes[0] as HTMLElement);
    // 5.监听组件销毁事件
    this.componentRef.onDestroy(() => {
      console.log('component destory');
    });
    // 获取组件实例，相当于用@ViewChild获取子组件一样
    const { instance } = this.componentRef;
    // 6.监听组件的output事件
    instance.closed.subscribe(() => {
      this.componentRef.destroy();
      this.container = null;
    });
    return instance;
  }
}
