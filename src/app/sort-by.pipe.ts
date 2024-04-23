import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  standalone: true,
})
export class SortByPipe implements PipeTransform {
  transform(
    value: any[],
    key: string,
    direction: 'asc' | 'desc' = 'asc'
  ): any[] {
    if (!Array.isArray(value) || !key) {
      return value;
    }

    const sortedArray = value.sort((a, b) => {
      const valueA = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
      const valueB = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];

      if (valueA < valueB) {
        return direction === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return direction === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    return sortedArray;
  }
}
