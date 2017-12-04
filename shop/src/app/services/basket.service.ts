import { Injectable } from '@angular/core';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Product } from '../product/product';
import { ProductService } from '../services/product.service'
import { OrderedProduct } from '../orderedProduct'


@Injectable()
export class BasketService {

  orderedProducts: OrderedProduct[];
  iloscProductow: number = 0;
  sumOfPrice: number = 0;

  constructor(private productService: ProductService) {
    this.orderedProducts = [];
  }

  orderProduct(product: Product): void {
    let orderedProduct = new OrderedProduct(product);
    if(this.orderedProducts.some(e => e.name === orderedProduct.name && e.promotion === orderedProduct.promotion)){
      this.orderedProducts.find(e => e.name === orderedProduct.name && e.promotion === orderedProduct.promotion).amount++;
    } else {
      this.orderedProducts.push(orderedProduct);      
    }
    this.sumOfPrice += product.promotion? +product.price*(100-product.promotion)/100 : +product.price;
    this.iloscProductow++;
  }

  unorderProduct(product: Product): void {
    let orderedProduct = new OrderedProduct(product);    
    this.removeProduct(orderedProduct);
  }

  removeProductFromBasket(orderedProduct: OrderedProduct) : void {
    this.removeProduct(orderedProduct);
  }

  removeProduct(orderedProduct: OrderedProduct) : void {
    if (this.orderedProducts.some(e => (e.name === orderedProduct.name && e.promotion === orderedProduct.promotion && e.amount > 1))) {
      this.orderedProducts.find(e => e.name === orderedProduct.name).amount--;
    } else {
      var index = this.orderedProducts.indexOf(this.orderedProducts.find(e => e.name === orderedProduct.name && e.promotion === orderedProduct.promotion));
      if (index > -1) {
        console.log("usuwam");
        this.orderedProducts.splice(index, 1);
      }
    }
    this.sumOfPrice -= orderedProduct.promotion? +orderedProduct.price * (100 - orderedProduct.promotion) / 100 : orderedProduct.price;
    this.iloscProductow--;
  }

  isInBasket(product: Product) : boolean {
    return this.orderedProducts.some(e => e.name === product.name );
  }

  clearBasket(){
    this.orderedProducts = [];
    this.iloscProductow = 0;
    this.sumOfPrice = 0;
  }

  countPriceAndNumber(){
    this.orderedProducts.forEach(product => {
      this.iloscProductow += product.amount;
      this.sumOfPrice += product.amount*product.price;
    })
  }


}
