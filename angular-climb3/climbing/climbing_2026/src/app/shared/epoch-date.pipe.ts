import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epochDate',
})
export class EpochDatePipe implements PipeTransform {
  transform(value: string | null | undefined): Date | null {
    if (!value) {
      return null;
    }

    const serializedDate = value.match(/\/Date\((-?[0-9]*\.?[0-9]*)\)\//);
    if (serializedDate) {
      return new Date(Number(serializedDate[1]) * 1000);
    }

    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? null : new Date(parsed);
  }
}
