import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../user'
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { BasketService } from '../services/basket.service';
import { Product } from '../product/product';
import { OrderedProduct } from '../orderedProduct';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  error: boolean = false;
  submitted: boolean = false;
  user: User;

  constructor(private userSerice: UserService, private basketService: BasketService, private location: Location, private router: Router) {
    this.user = new User();
    this.user.role = "admin";
  }

  ngOnInit() {
  }

  checkUsername(): boolean {
    return this.user.username != "";
  }

  checkPassword(): boolean {
    return this.user.password != "";
  }

  checkForm(): boolean {
    return this.checkUsername() && this.checkPassword();
  }

  sendForm(): void {
    if(this.checkForm()){

    console.log("wysyłam formularz");
    this.userSerice.authenticate(this.user)
      .subscribe( () => {
        if (this.userSerice.isLoggedAsAdmin){
          this.error = false;
          this.router.navigate(['/admin-panel'])
        } else if(this.userSerice.isLogged){
          this.error = false;
          this.getBasket();
          this.router.navigate(['/dashboard']);
        } else {
          this.error = true;
        }
      },
      error => {
        console.log(error);
        this.error = true;
      });
    } else {
      this.error = true;
    }
    this.submitted = true;
  }

  getBasket() : void {
    this.userSerice.getBasketByUsername().subscribe(
      products => {
        this.basketService.orderedProducts = products;
        this.basketService.countPriceAndNumber();
    }),
    error => console.log(error);
  }

}
