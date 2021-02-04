import { NgModule } from '@angular/core';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { NumberGtZeroPipe } from './number-gt-zero.pipe';

@NgModule({
  declarations: [
    ExponentialStrengthPipe,
    NumberGtZeroPipe
  ],
  imports: [],
  exports: [
    ExponentialStrengthPipe,
    NumberGtZeroPipe
  ]
})
export class PipeModule { }
