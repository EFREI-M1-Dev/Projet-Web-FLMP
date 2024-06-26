import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Message } from '../../messages/entities/message.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Conversation {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field(() => [User])
  users: User[];

  @Field(() => [Message])
  messages: Message[];
}
