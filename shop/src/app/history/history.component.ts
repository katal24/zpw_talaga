import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { UserService } from '../services/user.service';

import { Order } from '../order';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  orders: Order[];
  error: boolean;
  selectedId: number;

  constructor(private ordersService: OrdersService, private userService: UserService) {
  }
  
  ngOnInit() {
    this.getOrders();   
  }

  getOrders(): void {
    this.ordersService.getOrdersByUsername(this.userService.user.username).subscribe(orders => {
      this.orders = orders;
      this.orders.forEach(order => { if (!order.isFinished) { order.isFinished = false } });
    },
      error => {
        this.error = true;
      });
  }

  showDetails(selectedId) {
    this.selectedId = selectedId;
  }

}

