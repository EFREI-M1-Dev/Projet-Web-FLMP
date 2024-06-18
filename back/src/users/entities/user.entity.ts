import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Message } from 'src/messages/entities/message.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  avatar: string;

  @Field()
  createdAt: Date;

  @Field(() => [Conversation])
  conversations: Conversation[];

  @Field(() => [Message])
  messages: Message[];
}
