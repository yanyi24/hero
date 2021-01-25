import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'exponentialStrength'
})
export class ExponentialStrengthPipe implements PipeTransform {
  // 实现transform方法，返回处理过后的数字
  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }
}
