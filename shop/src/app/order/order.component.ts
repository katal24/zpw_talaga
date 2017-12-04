import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Order } from '../order'
import { BasketService } from '../services/basket.service'
import { OrdersService } from '../services/orders.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  error : boolean = false;
  submitted : boolean = false;
  order : Order;
  formCorrect : boolean;

  constructor(private location: Location, private basketService: BasketService, private ordersService: OrdersService, private userService: UserService, private router: Router) { 
    this.order = new Order(basketService.orderedProducts, basketService.sumOfPrice, basketService.iloscProductow, userService.user.username);
  }

  ngOnInit() {   
  }

  goBack(): void {
    this.location.back();
  }

  checkName() : boolean {
    return this.order.name != "";
  }

  checkAddress(): boolean {
    return this.order.address != "";
  }

  checkForm() : boolean {
    return this.checkAddress() && this.checkName();
  }

  sendForm() : void {
    console.log("wysyłam formularz poprzez order service");
    if(this.checkForm()){
    this.ordersService.addOrderToDb("/orders", this.order).subscribe(
      order => {
        this.basketService.iloscProductow = 0;
        this.basketService.orderedProducts = [];
        this.basketService.sumOfPrice = 0;
        this.router.navigate(['/dashboard']);
      },
      error => this.error = true);
    } else {
      this.error = true;
    }
    this.submitted = true;
  }
}
