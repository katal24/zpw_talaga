import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../user'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { OrderedProduct } from '../orderedProduct';


@Injectable()
export class UserService {

  isLoggedAsAdmin : boolean = false;
  isLogged : boolean = false;
  redirectURL: string;
  user: User = new User();

  serverAddress: string = "http://localhost:5000";

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('currentUser')){

      let user = localStorage.getItem('currentUser');
      console.log(user);
      console.log(user.indexOf('"role":"admin"') >= 0);
      this.isLogged = user!= null ? true : false;
      this.isLoggedAsAdmin = user && user.indexOf('"role":"admin"') >= 0 ? true : false;
      console.log("Admin is logged: " + this.isLoggedAsAdmin);
      console.log("User is logged: " + this.isLogged);    
    }
   }

  authenticate(user: User): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<User>(this.serverAddress + "/users/login", JSON.stringify(user), { headers: headers, withCredentials: true }).pipe(
      tap((user : User) => {
        this.user.username = user.username;
        if(user && user.role === "admin"){
          console.log("jest user");
          this.isLoggedAsAdmin = true;
          this.isLogged = true;          
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else if (user) {
          this.isLogged = true;
          localStorage.setItem('currentUser', JSON.stringify(user));          
        }
      }),
      
    );
  }

  register(user: User): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<User>(this.serverAddress + "/users/register", JSON.stringify(user), { headers: headers, withCredentials: true }).pipe(
      tap(user => {
        console.log(user)
      }),

    );
  }

  logout(): void {
    this.http.get(this.serverAddress + "/users/logout", { withCredentials: true }).subscribe(
      ok => console.log(ok),
      err => console.log(err)
    )
    this.isLogged = false;
    if(this.isLoggedAsAdmin) this.isLoggedAsAdmin = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/dashboard'])
  }

  getBasketByUsername() : Observable<OrderedProduct[]> {
      console.log("szukam dla: " + this.user.username);
      return this.http.get<OrderedProduct[]>(this.serverAddress + '/basket/' + this.user.username, { withCredentials: true });
   }

  postBasket(orderedProducts: OrderedProduct[]) : Observable<OrderedProduct[]> {
    return this.http.post<OrderedProduct[]>(this.serverAddress + '/basket/', {username: this.user.username, orderedProducts: orderedProducts}, { withCredentials: true });
  }
}
