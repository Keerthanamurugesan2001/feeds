import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any): any {
    if(value) {
      const diff = Math.floor((+new Date() - +new Date(value)) / 1000);
      if(diff == 0) return 'just now';
      const intervals: any = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for(const i in intervals) {
        counter = Math.floor(diff / intervals[i]);
        if(counter > 0) {
          if(counter == 1) {
            return counter + ' ' + i + ' ago';
          }
          return counter + ' ' + i + 's ago';
        }
      }
    }
    return value;
  }

}
