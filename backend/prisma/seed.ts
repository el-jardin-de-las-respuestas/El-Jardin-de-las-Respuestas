import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {

  const roles = [
    { id: 1, name: 'user' },
    { id: 2, name: 'professional' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: {},          
      create: {            
        id: role.id,
        name: role.name,
      },
    });
  }

  console.log('Roles seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

