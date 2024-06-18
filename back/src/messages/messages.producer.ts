import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateMessageInput } from './dto/create-message.input';

@Injectable()
export class MessagesProducer {
  constructor(@InjectQueue('message-queue') private messageQueue: Queue) {}

  async addMessageToQueue(createMessageInput: CreateMessageInput) {
    await this.messageQueue.add('send-message-job', createMessageInput);
  }
}
