import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MessagesService } from './messages.service';
import { CreateMessageInput } from './dto/create-message.input';

@Processor('message-queue')
export class MessagesConsumer {
  constructor(private readonly messagesService: MessagesService) {}

  @Process('send-message-job')
  async handleSendMessageJob(job: Job<CreateMessageInput>) {
    const { data } = job;
    await this.messagesService.saveMessage(data);
  }
}
