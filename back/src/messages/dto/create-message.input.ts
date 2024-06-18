import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  content: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  conversationId: number;
}
