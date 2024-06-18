import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsResolver } from './conversations.resolver';
import { ConversationsService } from './conversations.service';
import { CreateConversationInput } from './dto/create-conversation.input';

describe('ConversationsResolver', () => {
  let resolver: ConversationsResolver;
  let service: ConversationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationsResolver,
        {
          provide: ConversationsService,
          useValue: {
            create: jest.fn(),
            getConversations: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ConversationsResolver>(ConversationsResolver);
    service = module.get<ConversationsService>(ConversationsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createConversation', () => {
    it('should call service.create and return the result', async () => {
      const createInput: CreateConversationInput = { userIds: [1, 2] };
      const result = {
        id: 1,
        createdAt: new Date(),
        users: [],
        messages: [],
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await resolver.createConversation(createInput)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createInput);
    });
  });

  describe('getConversations', () => {
    it('should call service.getConversations and return the result', async () => {
      const userId = 1;
      const result = [
        { id: 1, createdAt: new Date(), users: [], messages: [] },
      ];

      jest.spyOn(service, 'getConversations').mockResolvedValue(result);

      expect(await resolver.getConversations(userId)).toEqual(result);
      expect(service.getConversations).toHaveBeenCalledWith(userId);
    });
  });
});
