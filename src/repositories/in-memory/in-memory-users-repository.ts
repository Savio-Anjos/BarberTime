import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  public async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(user);

    return user;
  }
  public async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }
  public async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
  public async findAll(): Promise<User[]> {
    return this.items;
  }
}
