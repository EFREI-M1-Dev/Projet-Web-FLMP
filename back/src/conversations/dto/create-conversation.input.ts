import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateConversationInput {
  @Field(() => [Int])
  otherUserIds: number[];
}
