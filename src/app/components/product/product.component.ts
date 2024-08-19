import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {
  Imetadata,
  IResponseToReturn,
} from '../../interfaces/iresponse-to-return';
import { IProductToReturn } from '../../interfaces/product-to-return';
import {
  producerUpdateValueVersion,
  setThrowInvalidWriteToSignalError,
} from '@angular/core/primitives/signals';
import {
  CurrencyPipe,
  LowerCasePipe,
  NgFor,
  UpperCasePipe,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuyPipe } from '../../Pipes/buy.pipe';
import { SearchPipePipe } from '../../Pipes/search-pipe.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgFor,
    CurrencyPipe,
    RouterLink,
    CarouselModule,
    LowerCasePipe,
    UpperCasePipe,
    BuyPipe,
    SearchPipePipe,
    FormsModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  Images: string[] = [];

  searchInputValue: string | null = null;

  productsToReturn: IResponseToReturn<IProductToReturn> = {
    results: 0,
    metadata: {
      currentPage: 1,
      numberOfPages: 2,
      limit: 40,
      nextPage: 0,
    },
    Data: new Set<IProductToReturn>(),
  };

  ListOfProducts: IProductToReturn[] = [];

  numOfCartItems: any = 0;

  constructor(
    private _productService: ProductService,
    private _carService: CartService
  ) {}

  ngOnInit(): void {
    this.subscribeAtGetAllProducts();
  }

  subscribeAtGetAllProducts() {
    this._productService.getAll().subscribe({
      next: (response) => {
        this.productsToReturn = {
          results: response.results,
          metadata: <Imetadata>{
            currentPage: response.currentPage,
            numberOfPages: response.numberOfPages,
            limit: response.limit,
            nextPage: response.nextPage,
          },
          Data: new Set<IProductToReturn>(),
        };

        response.data.forEach((item: any) => {
          const product: IProductToReturn = {
            id: item.id,
            sold: item.sold, // Use default value if undefined
            images: [],
            title: item.title,
            description: item.description,
            price: item.price,
            imageCover: item.imageCover,
            ratingsAverage: item.ratingsAverage,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };

          this.productsToReturn.Data.add(product);

          item.images.forEach((element: string) => {
            product.images.push(element);
            this.Images.push(element);
          });
        });

        this.ListOfProducts = Array.from(this.productsToReturn.Data);
      },
      error: (err) => {},
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };
}
