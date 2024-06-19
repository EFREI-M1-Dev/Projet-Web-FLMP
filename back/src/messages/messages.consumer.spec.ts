import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bull';
import { MessagesConsumer } from './messages.consumer';
import { MessagesService } from './messages.service';

describe('MessagesConsumer', () => {
  let consumer: MessagesConsumer;
  let messagesService: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesConsumer,
        {
          provide: MessagesService,
          useValue: {
            saveMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    consumer = module.get<MessagesConsumer>(MessagesConsumer);
    messagesService = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(consumer).toBeDefined();
  });

  it('should save message from queue', async () => {
    const job: Job = {
      data: {
        content: 'Hello, world!',
        userId: 1,
        conversationId: 1,
      },
    } as Job;

    await consumer.handleSendMessageJob(job);

    expect(messagesService.saveMessage).toHaveBeenCalledWith(job.data);
  });
});
