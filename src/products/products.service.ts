import { Injectable } from '@nestjs/common';
import { db, Product } from '../db';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }

  public getById(id: Product['id']): Product | null {
    return db.products.find((p) => p.id === id) || null;
  }

  public create(productData: CreateProductDTO): Product {
    const newProduct = { ...productData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  }

  public updateById(id: Product['id'], productData: UpdateProductDTO): void {
    const index = db.products.findIndex((p) => p.id === id);
    if (index > -1) {
      db.products[index] = { ...db.products[index], ...productData };
    }
  }

  public deleteById(id: Product['id']): void {
    db.products = db.products.filter((p) => p.id !== id);
  }
}
