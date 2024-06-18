import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { BullModule } from '@nestjs/bull';
import { MessagesProducer } from './messages.producer';
import { MessagesConsumer } from './messages.consumer';

@Module({
  providers: [
    MessagesResolver,
    MessagesService,
    PrismaService,
    MessagesProducer,
    MessagesConsumer,
  ],
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
})
export class MessagesModule {}
