import { UsersRepository } from '@/repositories/users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { DeleteUserUseCase } from './delete-user';

let usersRepository: UsersRepository;
let sut: DeleteUserUseCase;

describe('Delete User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(usersRepository);
  });

  it('should be able to delete a user', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    });

    const { deletedUser } = await sut.execute({
      id: user.id,
    });

    expect(deletedUser.name).toEqual('John Doe');
    expect(deletedUser.email).toEqual('johndoe@gmail.com');
  });
});
