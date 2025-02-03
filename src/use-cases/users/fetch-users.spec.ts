import { UsersRepository } from '@/repositories/users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { compare, hash } from 'bcryptjs';
import { FetchUsersUseCase } from './fetch-users';

let usersRepository: UsersRepository;
let sut: FetchUsersUseCase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new FetchUsersUseCase(usersRepository);
  });

  it('should be able to find all users', async () => {
    usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    });
    const { users } = await sut.execute();

    expect(users).toHaveLength(1);
  });
});
