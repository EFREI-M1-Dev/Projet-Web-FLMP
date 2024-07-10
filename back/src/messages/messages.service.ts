import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { PrismaService } from '../prisma/prisma.service';
import { ChatsGateway } from '../chats/chats.gateway';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private chatsGateway: ChatsGateway,
  ) {}

  async create(createMessageInput: CreateMessageInput) {
    const { content, userId, conversationId } = createMessageInput;

    const message = await this.prisma.message.create({
      data: {
        content,
        author: {
          connect: { id: userId },
        },
        conversation: {
          connect: { id: conversationId },
        },
      },
      include: {
        author: true,
        conversation: true,
      },
    });

    return message;
  }

  async saveMessage(data: CreateMessageInput) {
    const { content, userId, conversationId } = data;

    const message = await this.prisma.message.create({
      data: {
        content,
        author: {
          connect: { id: userId },
        },
        conversation: {
          connect: { id: conversationId },
        },
      },
      include: {
        author: true,
        conversation: true,
      },
    });

    this.chatsGateway.server
      .to(conversationId.toString())
      .emit('message', message);

    return message;
  }

  async getMessages(conversationId: number) {
    return this.prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        author: true,
        conversation: true,
      },
    });
  }
}
