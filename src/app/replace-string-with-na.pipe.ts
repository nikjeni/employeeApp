import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceStringWithNa'
})
export class ReplaceStringWithNaPipe implements PipeTransform {

  transform(value: any, replaceText: string = 'NA'): any {
    if (value.match(/[a-zA-Z]/gi)) {
      return replaceText;
    }
    return value;
  }

}
