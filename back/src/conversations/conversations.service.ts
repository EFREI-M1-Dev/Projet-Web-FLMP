import { Injectable } from '@nestjs/common';
import { CreateConversationInput } from './dto/create-conversation.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createConversationInput: CreateConversationInput,
    userId: number,
  ) {
    const userIdsSet = new Set<number>(createConversationInput.otherUserIds);
    userIdsSet.add(userId);

    const userIds = Array.from(userIdsSet);

    const conversation = await this.prisma.conversation.create({
      data: {
        users: {
          connect: userIds.map((id) => ({ id })),
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    return conversation;
  }

  async getConversations(userId: number) {
    return this.prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
  }
}
