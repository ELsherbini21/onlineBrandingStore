import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { IProductToReturn } from '../../interfaces/product-to-return';
import { ActivatedRoute, Route } from '@angular/router';
import { __param } from 'tslib';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SeeMorePipe } from '../../Pipes/see-more.pipe';
import { FormsModule } from '@angular/forms';
import { fromReadableStreamLike } from 'rxjs/internal/observable/innerFrom';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, SeeMorePipe, CarouselModule, FormsModule, NgFor],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product = <IProductToReturn>{};
  productId: any;

  constructor(
    private _productService: ProductService,
    private _activatedRouter: ActivatedRoute,
    private _cartService: CartService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRouter.paramMap.subscribe((params) => {
      this.productId = params.get('Id');
      console.log(this.productId);
    });

    this.subscribeAtGetAllProducts();
  }

  subscribeAtGetAllProducts() {
    this._productService.getProductById(this.productId).subscribe({
      next: (response: any) => {
        this.product = {
          id: response.data.id,
          sold: response.data.sold, // Use default value if undefined
          images: [],
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          imageCover: response.data.imageCover,
          ratingsAverage: response.data.ratingsAverage,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        };
        response.data.images.forEach((element: any) => {
          this.product.images.push(element);
        });
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(productId: string) {
    this._cartService.addToCart(productId).subscribe({
      next: (response) => {
        // i do this when the response return , it will effect at property in serveice , 
        // then service it will effect in navbar . 
        this._cartService.numOfCartItems.next(response.numOfCartItems);
        console.log(response);
        this._router.navigate(['/cart']);
      },
      error: (err) => {
        console.log(err);
      },
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
