import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { FilterUserInput } from './dto/filter-user.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GraphQLContext } from '../interfaces/graphql-context.interface';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  getUser(@Context() context: GraphQLContext) {
    return this.usersService.findOne(context.req.user.username);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args('filter', { nullable: true }) filter?: FilterUserInput) {
    return this.usersService.findAll(filter);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }
}
