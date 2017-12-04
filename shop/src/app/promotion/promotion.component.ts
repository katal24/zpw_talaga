import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { Product } from '../product/product';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})

export class PromotionComponent implements OnInit {
  optionsModel: number[];
  time: number;
  percent: number;
  myOptions: IMultiSelectOption[];
  products: Product[];
  selectedIds: string[];

  // Settings configuration
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: false
  };

  // Text configuration
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Wybierz',
    allSelected: 'All selected',
  };


  constructor(private productService: ProductService,
              private userService: UserService) { }


  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.myOptions = [];
        this.products.forEach((product, index) => {
          this.myOptions.push({id: index, name: product.name});
        })

      },
      err => console.log(err)
    )
  }

  savePromotion() : void {
    let a = this.optionsModel.map(num => this.findElemById(num, this.myOptions))
    let b = a.map(name => this.findElemByName(name.name, this.products))
    this.selectedIds = b.map(product => product.id);
    console.log(this.selectedIds);

    this.productService.createPromotion(this.selectedIds, this.time, this.percent);
  }

  findElemById(id: number, elems: any[]) :any{
    return elems.find(elem => elem.id == id);
  }

  findElemByName(name: string, elems: any[]): any {
    return elems.find(elem => elem.name == name);
  }
}

