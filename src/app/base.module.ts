import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipeModule } from './pipe/pipe.module';



@NgModule({
  declarations: [],
  imports: [
    PipeModule,
    CommonModule,
    DirectivesModule,
    ComponentsModule
  ],
  exports: [
    ComponentsModule,
    PipeModule,
    DirectivesModule
  ]
})
export class BaseModule { }
