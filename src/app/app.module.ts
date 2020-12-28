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
import { DirectiveComponent } from './components/directive/directive.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    NgIfComponent,
    NgSwitchComponent,
    NgForComponent,
    HighlightDirective,
    DirectiveComponent
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
