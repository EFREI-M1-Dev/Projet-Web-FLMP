import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsService } from './conversations.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConversationInput } from './dto/create-conversation.input';

describe('ConversationsService', () => {
  let service: ConversationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationsService,
        {
          provide: PrismaService,
          useValue: {
            conversation: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ConversationsService>(ConversationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new conversation and return it', async () => {
      const createInput: CreateConversationInput = { otherUserIds: [1, 2] };
      const result = {
        id: 1,
        createdAt: new Date(),
        users: [],
        messages: [],
      };

      jest.spyOn(prisma.conversation, 'create').mockResolvedValue(result);

      expect(await service.create(createInput, 1)).toEqual(result);
      expect(prisma.conversation.create).toHaveBeenCalledWith({
        data: {
          users: {
            connect: createInput.otherUserIds.map((id) => ({ id })),
          },
        },
        include: {
          users: true,
          messages: true,
        },
      });
    });
  });

  describe('getConversations', () => {
    it('should return conversations for a given user', async () => {
      const userId = 1;
      const result = [
        { id: 1, createdAt: new Date(), users: [], messages: [] },
      ];

      jest.spyOn(prisma.conversation, 'findMany').mockResolvedValue(result);

      expect(await service.getConversations(userId)).toEqual(result);
      expect(prisma.conversation.findMany).toHaveBeenCalledWith({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
        include: {
          users: true,
          messages: true,
        },
      });
    });
  });
});
