import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { UserNotFoundError } from '../errors/user-not-found-error';

interface UpdateUserUseCaseRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

interface UpdateUserUseCaseResponse {
  updatedUser: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({
    id,
    name,
    email,
    password,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const updatedUser = await this.usersRepository.update(id, {
      name,
      email,
      password_hash: password ? await hash(password, 6) : undefined,
    });

    return {
      updatedUser,
    };
  }
}
