import { Injectable } from '@nestjs/common';
import { Product } from 'src/interfaces/product.interface';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];

  create(product: Product) {
    this.products.push(product);
    return { newProduct: product };
  }

  findAll(): Product[] {
    return this.products;
  }

  updateProduct(id: String, product: Product) {
    const index = this.products.findIndex((product) => product.id == id);
    this.products.splice(index, 1, { ...product });
    return product;
  }

  deleteProduct(id: String) {
    const index = this.products.findIndex((product) => product.id == id);
    this.products.splice(index, 1);
  }
}
