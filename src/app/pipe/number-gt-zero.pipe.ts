import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberGtZero',
  pure: false
})
export class NumberGtZeroPipe implements PipeTransform {

  transform(arr: any[]): number[] {
    const result: number [] = [];
    arr.map(n => {
      if (!isNaN(n) && n > 0) {
        result.push(n);
      }
    })
    return result;
  }

}
