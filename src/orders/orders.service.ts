import { Injectable } from '@nestjs/common';
import { db, Order } from '../db';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }

  public getById(id: Order['id']): Order | null {
    return db.orders.find((o) => o.id === id) || null;
  }

  public create(orderData: CreateOrderDTO): Order {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  public updateById(id: Order['id'], orderData: UpdateOrderDTO): void {
    const index = db.orders.findIndex((o) => o.id === id);
    if (index > -1) {
      db.orders[index] = { ...db.orders[index], ...orderData };
    }
  }

  public deleteById(id: Order['id']): void {
    db.orders = db.orders.filter((o) => o.id !== id);
  }
}
