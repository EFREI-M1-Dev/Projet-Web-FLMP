import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterUserInput {
  @Field()
  username: string;
}
