import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product/product';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products: Product[];
  error: boolean;
  selectedProduct: Product;
  selectedId: number;
  page: number;
  errorMessage: string;

  constructor(private productService: ProductService) { 
    this.page=1;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
    .subscribe(products => {
      this.productService.products = products;
    },
      error => {
        this.error = true;
      });
  }

  editProduct(selectedId){
    this.selectedId = selectedId;
  }

  deleteProduct(product){
    this.productService.deleteProduct(product).subscribe(
      remocedProduct => {
        var index = this.productService.products.indexOf(product, 0);
        this.productService.products.splice(index, 1);
      },
      error => this.errorMessage = error
    )

  }
}
