import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../product/product';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { ImageUploadComponent, FileHolder } from 'angular2-image-upload';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  product: Product;
  id; number;
  error: string;
  selectedFiles;
  url: string;
  
  constructor(private location: Location, 
              private activatedRoute: ActivatedRoute, 
              private productService: ProductService,
              private userService: UserService) { }

  ngOnInit() {
    // this.ng4FilesService.addConfig(this.testConfig);
    this.getProduct();
  }

  getProduct(){    
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
    });
    console.log(this.id);
    if(this.id!=0){

      this.productService.getProduct(this.id).subscribe(
        product => {
          console.log(product);
          this.product = product;
          this.url = "http://localhost:5000/images/" + this.product.id;
        },
        error => this.error = "Błąd pobierania danych"
      )
    } else {
      this.product = new Product();
    }
  }

  addProduct(){
    this.productService.addProduct(this.product).subscribe(
      product => console.log(product),
      error => this.error = "Nie udało się dodać produktu"
    )
  }

  editProduct(){
    this.productService.editProduct(this.product).subscribe(
      product => console.log(product),
      error => this.error = "Nie udało się edytować produktu"
    )
  }

  setError(message: string){
    this.error = message;
  }

  goBack(): void {
    this.location.back();
  }

  onUploadStateChanged(file: FileHolder) : void {
    console.log("onUploadStateChanged");
  }

  onUploadFinished(file: FileHolder) : void {
    // console.log(file.serverResponse["_body"]);
  }

  onRemoved(file: FileHolder) : void {
   this.productService.deleteImage(file.serverResponse["_body"]).subscribe(
     ok => {
        console.log("ok")
        console.log(ok);
      },
     err => {console.log(err)}
   )
  }

  removeImage(image : string){

    var index = this.product.images.indexOf(image, 0);
    this.product.images.splice(index, 1);

    this.productService.deleteImage(image).subscribe(
      ok => {
        console.log("ok")
        this.productService.editProduct(this.product).subscribe(
          ok => {
          },
          err => console.log(err)
        );
      },
      err => { console.log(err) }
    )
  }
}
