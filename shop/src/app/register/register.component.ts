import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../user'
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: boolean = false;
  submitted: boolean = false;
  user: User;
  message: string = "";

  constructor(private userSerice: UserService, private location: Location, private router: Router) {
    this.user = new User();
    this.user.role = "user";
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
    if (this.checkForm()) {
      console.log("wysyłam formularz");
      this.userSerice.register(this.user)
        .subscribe(() => {
            this.message = "Konto zostało utworzone. Zaloguj się."
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

}
