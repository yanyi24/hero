import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { AlertComponent } from './alert/alert.component';
import { ContentChildPanelComponent } from './content-child/content-child-panel/content-child-panel.component';
import { ContentChildComponent } from './content-child/content-child.component';
import { DialogComponent } from './dialog/dialog.component';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { NgForComponent } from './ng-for/ng-for.component';
import { NgIfComponent } from './ng-if/ng-if.component';
import { NgSwitchComponent } from './ng-switch/ng-switch.component';
import { PipeComponent } from './pipe/pipe.component';
import { TplOutletComponent } from './tpl-outlet/tpl-outlet.component';
import { TransferPanelComponent } from './transfer/transfer-panel/transfer-panel.component';
import { TransferComponent } from './transfer/transfer.component';
import { PanelComponent } from './view-child/panel/panel.component';
import { ViewChildComponent } from './view-child/view-child.component';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '../pipe/pipe.module';
import { ServiceComponent } from './service/service.component';
import { LoggerComponent } from './logger/logger.component';
import { LoggerContentComponent } from './logger/logger-content/logger-content.component';
import { RxjsDemoComponent } from './rxjs-demo/rxjs-demo.component';


@NgModule({
  declarations: [
    DialogComponent,
    NgIfComponent,
    NgSwitchComponent,
    NgForComponent,
    TplOutletComponent,
    ViewChildComponent,
    PanelComponent,
    ContentChildComponent,
    ContentChildPanelComponent,
    PipeComponent,
    LifeCycleComponent,
    TransferComponent,
    TransferPanelComponent,
    AlertComponent,
    AlertBoxComponent,
    ServiceComponent,
    LoggerComponent,
    LoggerContentComponent,
    RxjsDemoComponent
  ],
  imports: [
    PipeModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    DialogComponent,
    NgIfComponent,
    NgSwitchComponent,
    NgForComponent,
    TplOutletComponent,
    ViewChildComponent,
    PanelComponent,
    ContentChildComponent,
    ContentChildPanelComponent,
    PipeComponent,
    LifeCycleComponent,
    TransferComponent,
    TransferPanelComponent,
    AlertComponent,
    AlertBoxComponent,
    ServiceComponent,
    LoggerComponent,
    LoggerContentComponent,
    RxjsDemoComponent
  ]
})
export class ComponentsModule { }
