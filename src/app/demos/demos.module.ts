import { NgModule } from '@angular/core';
import { DragComponent } from './rxjs/drag/drag.component';
import { DemosComponent } from './demos.component';



@NgModule({
  declarations: [DragComponent, DemosComponent],
  imports: [ ],
  exports: [DemosComponent]
})
export class DemosModule { }
