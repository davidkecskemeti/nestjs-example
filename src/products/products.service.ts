import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ProductsService {
  products: Product[] = [];

  addProduct(title: string, description: string, price: number): number {
    const id = uuidv4();
    const product = new Product(id, title, description, price);
    this.products.push(product);
    return id;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: string): Product {
    return this.findProduct(id);
  }

  updateProduct(
    id: string,
    title?: string,
    description?: string,
    price?: number,
  ) {
    const product = this.findProduct(id);
    const updatedProduct = {
      ...product,
      ...(title && { title }),
      ...(description && { description }),
      ...(price && { price }),
    };

    const index = this.products.indexOf(product);
    this.products[index] = updatedProduct;
  }

  deleteProduct(id: string) {
    const product = this.findProduct(id);
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }

  private findProduct(id: string): Product {
    const product: Product = this.products.find(
      (product: Product) => product.id === id,
    );

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
