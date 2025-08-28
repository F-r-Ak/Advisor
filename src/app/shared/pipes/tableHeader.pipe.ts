import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'keys', standalone: true })
export class KeysPipe implements PipeTransform {
  transform(value: any): any {
    return Object.keys(value);
  }
}
