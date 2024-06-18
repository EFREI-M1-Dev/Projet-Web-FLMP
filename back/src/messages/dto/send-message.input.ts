import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field()
  content: string;

  @Field(() => Int)
  conversationId: number;
}
