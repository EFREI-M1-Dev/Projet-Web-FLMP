import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { username: 'alice' },
    update: {},
    create: {
      username: 'alice',
      password: '$2b$10$i2RvlG/PUh8Yvl37oeFb3udWVznoduXayYvW1YXyYTlP7ltAri1cK',
      avatar: 'http://localhost:3000/static/avatar-1.png',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: 'bob' },
    update: {},
    create: {
      username: 'bob',
      password: '$2b$10$i2RvlG/PUh8Yvl37oeFb3udWVznoduXayYvW1YXyYTlP7ltAri1cK',
      avatar: 'http://localhost:3000/static/avatar-2.png',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { username: 'charlie' },
    update: {},
    create: {
      username: 'charlie',
      password: '$2b$10$i2RvlG/PUh8Yvl37oeFb3udWVznoduXayYvW1YXyYTlP7ltAri1cK',
      avatar: 'http://localhost:3000/static/avatar-3.png',
    },
  });

  const user4 = await prisma.user.upsert({
    where: { username: 'diana' },
    update: {},
    create: {
      username: 'diana',
      password: '$2b$10$i2RvlG/PUh8Yvl37oeFb3udWVznoduXayYvW1YXyYTlP7ltAri1cK',
      avatar: 'http://localhost:3000/static/avatar-4.png',
    },
  });

  console.log('Users created successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
