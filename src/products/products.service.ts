import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  public getAll() {
    return this.prismaService.product.findMany();
  }

  public getById(id: string) {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  public getAllExtended() {
    return this.prismaService.product.findMany({
      include: { orders: true },
    });
  }

  public getExtendedById(id: string) {
    return this.prismaService.product.findUnique({
      where: { id },
      include: { orders: true },
    });
  }

  public create(productData: {
    name: string;
    price: number;
    description: string;
  }) {
    return this.prismaService.product.create({
      data: productData,
    });
  }

  public updateById(
    id: string,
    productData: {
      name: string;
      price: number;
      description: string;
    },
  ) {
    return this.prismaService.product.update({
      where: { id },
      data: productData,
    });
  }

  public deleteById(id: string) {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
