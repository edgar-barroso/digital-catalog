import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function main() {
  await prisma.user.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.user.create({
    data: {
      email: 'admin1@gmail.com',
      name: 'Admin One',
      password: 'admin'
    },
  })


  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });