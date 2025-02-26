import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUsersRepository implements UsersRepository {
  public async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id: id } });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email: email } });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  public async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await prisma.user.update({ where: { id }, data });

    return user;
  }

  public async delete(id: string): Promise<User> {
    const user = await prisma.user.delete({ where: { id } });

    return user;
  }
}
