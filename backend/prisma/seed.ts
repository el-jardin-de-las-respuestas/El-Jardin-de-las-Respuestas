import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Roles
  const roles = [
    { id: 1, name: 'user' },
    { id: 2, name: 'professional' },
    {id: 3, name: 'admin'}
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

  console.log('✅ Roles agregados');

  if (!process.env.ADMIN_PASSWORD) {
  throw new Error("ADMIN_PASSWORD is not defined in .env");
}
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      username: 'Admin',
      email: 'admin@test.com',
      password: hashedPassword,
      birthdate: new Date('2000-01-01'),
      roleId: 3,
    },
  });

  console.log('✅ Usuario admin creado');

  // Foros
  const forums = [
    { title: 'Experiencias con anticonceptivos', description: 'Comparte tus experiencias', userId: user.id },
    { title: 'Apoyo emocional', description: 'Espacio de apoyo', userId: user.id },
    { title: 'Dudas sobre el ciclo menstrual', description: 'Preguntas y respuestas', userId: user.id },
    { title: 'Consultas médicas generales', description: 'Consultas generales', userId: user.id },
    { title: 'Derechos y legislación', description: 'Información sobre derechos', userId: user.id },
  ];

  for (const forum of forums) {
    await prisma.forum.upsert({
      where: { id: forums.indexOf(forum) + 1 },
      update: {},
      create: {
        id: forums.indexOf(forum) + 1,
        ...forum,
      },
    });
  }

  console.log('✅ Foros seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });