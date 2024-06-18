import { Test, TestingModule } from '@nestjs/testing';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { MessagesProducer } from './messages.producer';

describe('MessagesResolver', () => {
  let resolver: MessagesResolver;
  let messagesProducer: MessagesProducer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesResolver,
        {
          provide: MessagesService,
          useValue: {
            saveMessage: jest.fn(),
          },
        },
        {
          provide: MessagesProducer,
          useValue: {
            addMessageToQueue: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<MessagesResolver>(MessagesResolver);
    messagesProducer = module.get<MessagesProducer>(MessagesProducer);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should add message to queue', async () => {
      const sendMessageInput = {
        content: 'Hello, world!',
        userId: 1,
        conversationId: 1,
      };

      await resolver.createMessage(sendMessageInput);

      expect(messagesProducer.addMessageToQueue).toHaveBeenCalledWith(sendMessageInput);
    });

    it('should return confirmation message', async () => {
      const sendMessageInput = {
        content: 'Hello, world!',
        userId: 1,
        conversationId: 1,
      };

      const result = await resolver.createMessage(sendMessageInput);

      expect(result).toBe('Message queued successfully');
    });
  });
});
