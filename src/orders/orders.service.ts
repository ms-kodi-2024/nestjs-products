import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll() {
    return this.prismaService.order.findMany({
      include: {
        product: true,
        client: true,
      },
    });
  }

  public getById(id: string) {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        product: true,
        client: true,
      },
    });
  }

  public create(orderData: { productId: string; clientId: string }) {
    const { productId, clientId, ...otherData } = orderData;
    return this.prismaService.order.create({
      data: {
        ...otherData,
        product: {
          connect: { id: productId },
        },
        client: {
          connect: { id: clientId },
        },
      },
      include: {
        product: true,
        client: true,
      },
    });
  }

  public updateById(
    id: string,
    orderData: { productId: string; clientId: string },
  ) {
    const { productId, clientId } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        product: {
          connect: { id: productId },
        },
        client: {
          connect: { id: clientId },
        },
      },
      include: {
        product: true,
        client: true,
      },
    });
  }

  public deleteById(id: string) {
    return this.prismaService.order.delete({
      where: { id },
    });
  }
}
