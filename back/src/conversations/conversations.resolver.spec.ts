import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsResolver } from './conversations.resolver';
import { ConversationsService } from './conversations.service';
import { CreateConversationInput } from './dto/create-conversation.input';
import { GraphQLContext } from '../interfaces/graphql-context.interface';

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
      const createInput: CreateConversationInput = { otherUserIds: [1, 2] };
      const result = {
        id: 1,
        createdAt: new Date(),
        users: [],
        messages: [],
      };

      const context: GraphQLContext = {
        req: {
          user: {
            userId: 1,
            username: '',
          },
        },
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await resolver.createConversation(createInput, context)).toEqual(
        result,
      );
      expect(service.create).toHaveBeenCalledWith(
        createInput,
        context.req.user.userId,
      );
    });
  });

  describe('getConversations', () => {
    it('should call service.getConversations and return the result', async () => {
      const userId = 1;
      const result = [
        { id: 1, createdAt: new Date(), users: [], messages: [] },
      ];

      const context: GraphQLContext = {
        req: {
          user: {
            userId: userId,
            username: '',
          },
        },
      };

      jest.spyOn(service, 'getConversations').mockResolvedValue(result);

      expect(await resolver.getConversations(context)).toEqual(result);
      expect(service.getConversations).toHaveBeenCalledWith(userId);
    });
  });
});
