import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './product'
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  ordered: boolean = false;
  _open: boolean = false;
  @Input() product: Product;
  @Output() signaledOrder = new EventEmitter<Product>();
  @Output() unOrder = new EventEmitter<Product>();
  constructor(private basketService: BasketService) { }

  ngOnInit() {
  }

  addProduct(product) : void {
    this.ordered = true;
    this.signaledOrder.emit(product);
  }

  subtractProduct(product) : void {
    this.unOrder.emit(product);
    this.ordered = this.basketService.isInBasket(product);
  }

  open(){
    this._open = true;
  }

  close(){
    this._open = false;
  }
}

