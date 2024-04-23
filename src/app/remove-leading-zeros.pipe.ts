import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeLeadingZeros',
  standalone: true,
})
export class RemoveLeadingZerosPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'string') {
      return value;
    }
    return value.toString().replace(/^0+/, '');
  }
}
