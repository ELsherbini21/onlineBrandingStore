import { Pipe, PipeTransform } from '@angular/core';
import { IProductToReturn } from '../interfaces/product-to-return';

@Pipe({
  name: 'searchPipe',
  standalone: true,
})
export class SearchPipePipe implements PipeTransform {
  transform(
    products: IProductToReturn[],
    pattern: string | null
  ): IProductToReturn[] {
    if (pattern !== null) {
      return products.filter((product) =>
        product.title.toUpperCase().includes(pattern.toUpperCase())
      );
    } else {
      return products;
    }
  }
}
