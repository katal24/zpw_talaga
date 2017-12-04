import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Location } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Product } from '../product/product';
import { ProductService } from '../services/product.service'
import { BasketService } from '../services/basket.service'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private location: Location, private productService: ProductService, private basketService: BasketService) {
  }

  ngOnInit() {
  }

   goBack(): void {
    this.location.back();
  }

}

@Pipe({ name: 'keys' })

export class KeysPipe implements PipeTransform {
  transform(product: Product, num: number): any {
    let keys = [];
    for (let key in product) {
      keys.push({ key: key, value: product[key] });
    }
    return keys;
  }
}
