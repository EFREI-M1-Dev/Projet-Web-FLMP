import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ConversationsService } from './conversations.service';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationInput } from './dto/create-conversation.input';
import { UpdateConversationInput } from './dto/update-conversation.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GraphQLContext } from '../interfaces/graphql-context.interface';

@Resolver(() => Conversation)
export class ConversationsResolver {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Mutation(() => Conversation)
  @UseGuards(JwtAuthGuard)
  createConversation(
    @Args('createConversationInput')
    createConversationInput: CreateConversationInput,
    @Context() context: GraphQLContext,
  ) {
    return this.conversationsService.create(
      createConversationInput,
      context.req.user.userId,
    );
  }

  @Query(() => [Conversation])
  @UseGuards(JwtAuthGuard)
  async getConversations(@Context() context: GraphQLContext) {
    return this.conversationsService.getConversations(context.req.user.userId);
  }

  @Query(() => [Conversation], { name: 'conversations' })
  findAll() {
    return this.conversationsService.findAll();
  }

  @Query(() => Conversation, { name: 'conversation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.conversationsService.findOne(id);
  }

  @Mutation(() => Conversation)
  updateConversation(
    @Args('updateConversationInput')
    updateConversationInput: UpdateConversationInput,
  ) {
    return this.conversationsService.update(
      updateConversationInput.id,
      updateConversationInput,
    );
  }

  @Mutation(() => Conversation)
  removeConversation(@Args('id', { type: () => Int }) id: number) {
    return this.conversationsService.remove(id);
  }
}
