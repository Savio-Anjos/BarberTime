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

  public async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const userIndex = this.items.findIndex((user) => user.id === id);
    const user = this.items[userIndex];

    this.items[userIndex] = {
      ...user,
      name: typeof data.name === 'string' ? data.name : user.name,
      email: typeof data.email === 'string' ? data.email : user.email,
      password_hash:
        typeof data.password_hash === 'string'
          ? data.password_hash
          : user.password_hash,
    };

    return this.items[userIndex];
  }

  public async delete(id: string): Promise<User> {
    const userIndex = this.items.findIndex((user) => user.id === id);
    const user = this.items[userIndex];
    this.items = this.items.filter((user) => user.id !== id);

    return user;
  }
}
