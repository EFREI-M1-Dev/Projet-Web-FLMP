import { Injectable } from '@nestjs/common';
import { CreateConversationInput } from './dto/create-conversation.input';
import { UpdateConversationInput } from './dto/update-conversation.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async create(createConversationInput: CreateConversationInput) {
    const { userIds } = createConversationInput;

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

  findAll() {
    return `This action returns all conversations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationInput: UpdateConversationInput) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
