import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epochDate'
})
export class EpochDatePipe implements PipeTransform {

  transform(value: string, args?: any): Date {
    if (!value) {return null;}
    var re = /\/Date\((-?[0-9]*\.?[0-9]*)\)\//;
        var m = value.match(re);
        if( m ) return new Date(parseFloat(m[1])*1000);
        else return null;
  }
}
