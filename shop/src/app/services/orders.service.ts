import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../product/product';
import { ProductService } from '../services/product.service'
import { BasketService } from '../services/basket.service'
import { Order } from '../order'

@Injectable()
export class OrdersService {

  serverAddress : string = "http://localhost:5000";
  dbAddress: string = "http://localhost:5000/orders";

  constructor(private http: HttpClient, private basketService: BasketService) { }

  addOrderToDb(url: string, order: Order): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Order>(this.serverAddress + url, JSON.stringify(order), { headers: headers }).pipe(
    tap(cos => console.log(cos))
    );
  }

  getOrders() : Observable<Order[]> {
    return this.http.get<Order[]>(this.dbAddress, {withCredentials: true});
  }

  putOrder(order: Order): Observable<Order>{
    console.log(order);
    return this.http.put<Order>(this.dbAddress+'/'+order["_id"], order, {withCredentials: true});
  }

  getOrdersByUsername(username: string): Observable<Order[]> {
    console.log("szukam dla: " + username);
    return this.http.get<Order[]>(this.dbAddress+'/'+username, { withCredentials: true });
  }

  deleteOrder(order: Order) : Observable<Order[]> {
    return this.http.delete<Order[]>(this.dbAddress+'/'+order["_id"], {withCredentials: true});
  }

}
