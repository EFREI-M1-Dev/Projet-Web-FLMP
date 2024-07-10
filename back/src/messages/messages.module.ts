import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { BullModule } from '@nestjs/bull';
import { MessagesProducer } from './messages.producer';
import { MessagesConsumer } from './messages.consumer';
import { ChatsGateway } from 'src/chats/chats.gateway';

@Module({
  providers: [
    MessagesResolver,
    MessagesService,
    PrismaService,
    MessagesProducer,
    MessagesConsumer,
    ChatsGateway,
  ],
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
})
export class MessagesModule {}
