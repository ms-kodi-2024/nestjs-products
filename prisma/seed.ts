import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    { id: '1', name: 'Canon 5D', price: 5000, description: 'DSLR camera' },
    { id: '2', name: 'Nikon D850', price: 6000, description: 'Pro DSLR' },
  ];
}

function getClients() {
  return [
    { id: '10', name: 'Alice Johnson', address: 'London, Baker Street 221B' },
    { id: '11', name: 'Bob Smith', address: 'New York, 5th Avenue 10' },
  ];
}

function getOrders() {
  return [
    {
      id: '100',
      productId: '1',
      clientId: '10',
    },
    {
      id: '101',
      productId: '2',
      clientId: '11',
    },
  ];
}

async function seed() {
  await db.order.deleteMany();
  await db.product.deleteMany();
  await db.client.deleteMany();

  await db.product.createMany({ data: getProducts() });
  await db.client.createMany({ data: getClients() });

  await Promise.all(
    getOrders().map(({ productId, clientId, ...rest }) =>
      db.order.create({
        data: {
          ...rest,
          product: { connect: { id: productId } },
          client: { connect: { id: clientId } },
        },
      }),
    ),
  );
}

seed();
