import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../order';
import { OrderedProduct } from '../orderedProduct'

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  orders: Order[];
  error: boolean;
  selectedId: number;
  selectedOrder: OrderedProduct[];

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.orders.forEach(order => {if(!order.isFinished) {order.isFinished = false}});
    },
      error => {
        this.error = true;
      });
  }

  showDetails(item: OrderedProduct[]){
    this.selectedOrder = item;
  }

  finishOrder(item) : void {
    item.isFinished = true;
    this.ordersService.putOrder(item).subscribe(item => {
      this.getOrders();
    })
  }

  deleteOrder(order: Order) {
    this.ordersService.deleteOrder(order).subscribe(
      ok => {
        this.getOrders();
       console.log(ok)
      },
      err => console.log(err)
    )
  }
}


@Pipe({
  name: 'matchesFinished'
})

export class MatchesFinishedPipe implements PipeTransform {
  transform(orders: Array<Order>, type: boolean): Array<Order> {
    console.log(orders);
    if(orders)
    return orders.filter(order => order.isFinished === type);
  }
}