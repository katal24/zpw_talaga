import { Product } from './product/product'

export class OrderedProduct extends Product{
  id: number;
  amount: number;

  constructor(product: Product){
    super();
    this.name = product.name;
    this.description = product.description;
    this.category = product.category;
    this.price = product.price;
    this.promotion = product.promotion;
    this.amount = 1;
  }
}