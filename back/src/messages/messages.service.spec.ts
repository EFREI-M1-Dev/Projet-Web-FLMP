import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MessagesService', () => {
  let service: MessagesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesService, PrismaService],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should save a message', async () => {
      const sendMessageInput = {
        content: 'Hello, world!',
        userId: 1,
        conversationId: 1,
      };

      prisma.message.create = jest.fn().mockReturnValue({
        id: 1,
        content: 'Hello, world!',
        createdAt: new Date(),
        authorId: 1,
        conversationId: 1,
      });

      const message = await service.saveMessage(sendMessageInput);

      expect(message).toBeDefined();
      expect(message.content).toBe('Hello, world!');
      expect(prisma.message.create).toHaveBeenCalledWith({
        data: {
          content: 'Hello, world!',
          author: {
            connect: { id: 1 },
          },
          conversation: {
            connect: { id: 1 },
          },
        },
        include: {
          author: true,
          conversation: true,
        },
      });
    });
  });
});
