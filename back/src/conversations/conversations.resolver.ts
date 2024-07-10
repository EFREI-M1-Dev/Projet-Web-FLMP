import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ConversationsService } from './conversations.service';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationInput } from './dto/create-conversation.input';
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
}
