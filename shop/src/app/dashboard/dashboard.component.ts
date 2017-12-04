import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Product } from '../product/product';
import { ProductService } from '../services/product.service'
import { BasketService } from '../services/basket.service'
import { FilterPrice } from '../filterPrice'
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[];
  iloscProductow: number = 0;
  categories: string[] = [];
  selectedCategories: string[] = [];
  filteringPrice: boolean = false;
  filterPrice: FilterPrice;
  searchText: string;
  page: number;
  error: boolean;

  constructor(private productService: ProductService, private basketService: BasketService, private socket: Socket) {
    this.filterPrice = new FilterPrice();
    this.searchText = "";
    this.page = 1;
  }

  ngOnInit() {
    this.getProduct();
  }


  updateProducts(ids : string[], promo: number){
    console.log("jest promocja");
    ids.forEach(id => {
      console.log(id);
      this.productService.products.find(product => product["_id"] === id).promotion = promo 
    });
    console.log(this.productService.products);
  }

  getProduct(): void {
    if(!this.productService.products){
      this.productService.getProducts()
      .subscribe(products => {
        this.productService.products = products;
        this.findCategories();
      },
      error => {
        this.error = true;
      });
    } else {
      this.findCategories();
    }
  }

  findCategories(): void {
    this.productService.products.map(product => {
      if (!this.categories.includes(product.category)) {
        this.categories.push(product.category);
        this.selectedCategories.push(product.category);
      }
    });
  }

  setCategory(e, category: string): void {
    let tempArray = [];
    tempArray = this.selectedCategories.slice();
    this.selectedCategories = [];
    if(!e.target.checked){
      console.log("odznaczono " + category);
      let updateItem = tempArray.find(item => item === category);
      let index = tempArray.indexOf(updateItem);
      tempArray.splice(index, 1);
    } else {
      tempArray.push(category);
      console.log("zaznaczono " + category);
    }
    console.log("temp");
    console.log(tempArray);
    this.selectedCategories = tempArray.slice();
    this.page = 1;
  }

  selectAll(e) : void{
    this.selectedCategories = [];    
    if (e.target.checked) {
      this.productService.products.map((product, index) => {
        if (!this.selectedCategories.includes(product.category)) {
          this.selectedCategories.push(product.category);
        }
      });
    }
    console.log(this.selectedCategories);
  }

  allChecked() : boolean {
    return this.selectedCategories.length === this.categories.length;
  }
}



@Pipe({
  name: 'matchesCategory'
})

export class MatchesCategoryPipe implements PipeTransform {
  transform(products: Array<Product>, selectedCategories: string[]): Array<Product> {
    console.log("pipe category");
    console.log(selectedCategories);
    return products.filter(product => selectedCategories.indexOf(product.category) !== -1);
  }
}

@Pipe({
  name: 'matchesPrice'
})

export class MatchesPricePipe implements PipeTransform {
  transform(products: Array<Product>, filteringPrice: boolean, min: number, max: number): Array<Product> {
    return products.filter(product => product.price >= min && product.price <= max || !filteringPrice);
  }
}

@Pipe({
  name: 'matchesName'
})

export class MatchesNamePipe implements PipeTransform {
  transform(products: Array<Product>, name: string): Array<Product> {
    return products.filter(product => product.name.toLowerCase().includes(name));
  }
}