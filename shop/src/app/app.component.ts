import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { Product } from './product/product';
import { ProductService } from './services/product.service'
import { BasketService } from './services/basket.service'
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  constructor(private productService: ProductService, private basketService: BasketService, private userService: UserService ){
  }


  ngOnInit(){
    this.productService.getMessage();
    this.productService.sendMessage("to ja");
    
  }

  logout(){
    this.userService.postBasket(this.basketService.orderedProducts).subscribe(
      ok => {
        this.basketService.clearBasket();
        this.userService.logout();
      }, 
      err => {
        this.basketService.clearBasket();
        this.userService.logout();
        console.log(err);
      }
    );
  }


}
