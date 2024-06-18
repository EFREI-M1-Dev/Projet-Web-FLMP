import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';
import { MessagesProducer } from './messages.producer';

describe('MessagesProducer', () => {
  let producer: MessagesProducer;
  let queue: Queue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesProducer,
        {
          provide: getQueueToken('message-queue'),
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    producer = module.get<MessagesProducer>(MessagesProducer);
    queue = module.get<Queue>(getQueueToken('message-queue'));
  });

  it('should be defined', () => {
    expect(producer).toBeDefined();
  });

  it('should add message to queue', async () => {
    const sendMessageInput = {
      content: 'Hello, world!',
      userId: 1,
      conversationId: 1,
    };

    await producer.addMessageToQueue(sendMessageInput);

    expect(queue.add).toHaveBeenCalledWith('send-message-job', sendMessageInput);
  });
});
