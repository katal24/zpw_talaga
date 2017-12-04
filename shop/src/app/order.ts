import { OrderedProduct } from './orderedProduct'

export class Order{
  id: number;
  numberOfProducts: number;
  name: string = "";
  address: string = "";
  username: string = "";
  products: OrderedProduct[];
  price: number;
  isFinished: boolean;

  constructor(products: OrderedProduct[], price: number, numberOfProducts: number, username: string) { 
    this.numberOfProducts = numberOfProducts;
    this.products = products;
    this.price = price;
    this.username = username;
    this.isFinished = false;
  }
}