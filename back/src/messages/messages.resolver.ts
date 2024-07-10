import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { MessagesProducer } from './messages.producer';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GraphQLContext } from '../interfaces/graphql-context.interface';
import { SendMessageInput } from './dto/send-message.input';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly messagesProducer: MessagesProducer,
  ) {}

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async createMessage(
    @Args('createMessageInput') sendMessageInput: SendMessageInput,
    @Context() context: GraphQLContext,
  ) {
    const createMessageInput: CreateMessageInput = {
      content: sendMessageInput.content,
      userId: context.req.user.userId,
      conversationId: sendMessageInput.conversationId,
    };

    await this.messagesProducer.addMessageToQueue(createMessageInput);

    return 'Message queued successfully';
  }

  @Query(() => [Message])
  @UseGuards(JwtAuthGuard)
  async getMessages(
    @Args('conversationId', { type: () => Int }) conversationId: number,
  ) {
    return this.messagesService.getMessages(conversationId);
  }
}
