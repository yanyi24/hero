import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DialogComponent } from './components/dialog/dialog.component';
import { NgIfComponent } from './components/ng-if/ng-if.component';
import { NgSwitchComponent } from './components/ng-switch/ng-switch.component';
import { FormsModule } from '@angular/forms';
import { NgForComponent } from './components/ng-for/ng-for.component';
import { HighlightDirective } from './directives/highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { TplOutletComponent } from './components/tpl-outlet/tpl-outlet.component';
import { ViewChildComponent } from './components/view-child/view-child.component';
import { PanelComponent } from './components/view-child/panel/panel.component';
import { ContentChildComponent } from './components/content-child/content-child.component';
import { ContentChildPanelComponent } from './components/content-child/content-child-panel/content-child-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    NgIfComponent,
    NgSwitchComponent,
    NgForComponent,
    HighlightDirective,
    UnlessDirective,
    TplOutletComponent,
    ViewChildComponent,
    PanelComponent,
    ContentChildComponent,
    ContentChildPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
