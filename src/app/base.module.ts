import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipeModule } from './pipe/pipe.module';
import { CommentService } from './services/comment.service';



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
  ],
  providers: [CommentService]
})
export class BaseModule { }
