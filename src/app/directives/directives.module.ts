import { NgModule } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { UnlessDirective } from './unless.directive';



@NgModule({
  declarations: [
    HighlightDirective,
    UnlessDirective
  ],
  imports: [],
  exports: [
    HighlightDirective,
    UnlessDirective
  ]
})
export class DirectivesModule { }
