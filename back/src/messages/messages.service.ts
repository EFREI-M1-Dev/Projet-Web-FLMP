import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

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

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageInput: UpdateMessageInput) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
