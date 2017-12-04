import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../product/product';
import { Socket } from 'ng-socket-io';
import { Subscription } from 'rxjs/Subscription';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  // headers: new HttpHeaders({ 'cache-control': "no-cache" }),
  
  
  withCredentials: true
};

@Injectable()
export class ProductService {
  
  serverAddress: string = "http://localhost:5000/";
  promotions : string[];
  sizeOfPromo: number;
  products: Product[];

  constructor(private http: HttpClient, private socket: Socket){
    this.getProducts().subscribe(
      products => this.products = products,
      err => console.log(err)
    )
    this.getPromotion();
  }

  getproduct(address: string) : Observable<Product[]> {
    return this.http.get<Product[]>(address);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.serverAddress + "products", { withCredentials: true });
  }

  deleteProduct(product: Product) : Observable<Product> {
    return this.http.delete<Product>(this.serverAddress + "products/" + product.id, { withCredentials: true });
  }

  getProduct(id: number) : Observable<Product> {
    return this.http.get<Product>(this.serverAddress + "products/" + id, { withCredentials: true });
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.serverAddress + "products/", product, httpOptions);
  }

  sendFiles(files: FormDataEntryValue[]) {
    return this.http.post(this.serverAddress + "products/", {"name":"ale", "files": files});
  }

  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.serverAddress + "products/" + product.id, product, httpOptions);
  }

  deleteImage(name: string) : Observable<any> {
    return this.http.post<any>(this.serverAddress+"images", {name: name}, httpOptions);
  }


  sendMessage(msg: string){
    this.socket.emit("message", msg);
  }

  getMessage() {
    this.socket.on('message', data => console.log(data.msg));
  }

  createPromotion(ids, time, percent){

    this.socket.emit("createPromotion", {ids: ids, time: time, promotion: percent});
  }

  getPromotion() {
    console.log("oczekuje");
    this.socket.on('createPromotion', data => {
      console.log("jest PROMO!!!!!!!!!!!!");
      this.updatePromotion(data.ids, data.promotion)
      this.updateProducts();
      });
    this.socket.on('deletePromotion', () => {
      this.getProducts().subscribe(
        products => this.products = products,
        err => console.log(err)
      )      
    });

  }

  updatePromotion(ids, promo){
    this.promotions = ids;
    this.sizeOfPromo = promo;
  }

  updateProducts() : void {
    console.log("jest promocja");
    this.promotions.forEach(id => {
      console.log(id);
      this.products.find(product => product["_id"] === id).promotion = this.sizeOfPromo;
    });
  }

}
