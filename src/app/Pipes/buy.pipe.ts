import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  // the name of this pipe . 
  name: 'buy',
  standalone: true,
})
export class BuyPipe implements PipeTransform {
  // this function that executed , i must know the input && Output of this pipe .
  transform(value: string): string {
    return `Buy ${value}`;
  }
}
