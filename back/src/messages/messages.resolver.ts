import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
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

  @Query(() => [Message], { name: 'messages' })
  findAll() {
    return this.messagesService.findAll();
  }

  @Query(() => Message, { name: 'message' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.findOne(id);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messagesService.update(
      updateMessageInput.id,
      updateMessageInput,
    );
  }

  @Mutation(() => Message)
  removeMessage(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.remove(id);
  }
}
