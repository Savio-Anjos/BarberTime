import { UsersRepository } from '@/repositories/users-repository';
import { CreateUserUseCase } from './create-user';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { compare, hash } from 'bcryptjs';
import { UpdateUserUseCase } from './update-user';

let usersRepository: UsersRepository;
let sut: UpdateUserUseCase;

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(usersRepository);
  });

  it('should be able to update a user', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    });

    const { updatedUser } = await sut.execute({
      id: user.id,
      name: 'Sávio Doe',
      email: 'saviodoe@gmail.com',
      password: 'saviodoe123',
    });

    expect(updatedUser.name).toEqual('Sávio Doe');
    expect(updatedUser.email).toEqual('saviodoe@gmail.com');
  });
});
