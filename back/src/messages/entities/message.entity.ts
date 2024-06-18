import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Message {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  createdAt: Date;

  @Field(() => User)
  author: User;

  @Field(() => Conversation)
  conversation: Conversation;
}
