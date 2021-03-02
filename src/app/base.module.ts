import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipeModule } from './pipe/pipe.module';
import { CommentService } from './services/comment.service';
import {DemosModule} from './demos/demos.module';
import {RouterStudyModule} from './components/router-study/router-study.module';



@NgModule({
  declarations: [],
  imports: [
    PipeModule,
    CommonModule,
    DirectivesModule,
    ComponentsModule,
    DemosModule,
    RouterStudyModule
  ],
  exports: [
    ComponentsModule,
    PipeModule,
    DirectivesModule,
    DemosModule,
    RouterStudyModule
  ],
  providers: [CommentService]
})
export class BaseModule { }
