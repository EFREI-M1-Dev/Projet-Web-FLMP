import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { getRandomInt } from 'src/utils/random';
import { FilterUserInput } from './dto/filter-user.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        ...createUserInput,
        avatar: `http://localhost:3000/static/avatar-${getRandomInt(1, 4)}.png`,
      },
    });
  }

  findAll(filter?: FilterUserInput) {
    const where: Prisma.UserWhereInput = {};

    if (filter?.username) {
      where.username = {
        contains: filter.username.toLowerCase(),
      };
    }

    return this.prisma.user.findMany({ where });
  }

  findOne(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
