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

  const createConversationWithMessages = async (
    user1Id: number,
    user2Id: number,
  ) => {
    const conversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: user1Id }, { id: user2Id }],
        },
      },
    });

    await prisma.message.createMany({
      data: [
        {
          content: 'Hello!',
          authorId: user1Id,
          conversationId: conversation.id,
        },
        {
          content: 'How are you?',
          authorId: user2Id,
          conversationId: conversation.id,
        },
      ],
    });
  };

  await createConversationWithMessages(user1.id, user2.id);
  await createConversationWithMessages(user2.id, user3.id);
  await createConversationWithMessages(user3.id, user4.id);
  await createConversationWithMessages(user4.id, user1.id);

  console.log('Users, conversations, and messages created successfully.');
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
