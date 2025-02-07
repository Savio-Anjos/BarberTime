import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { UserNotFoundError } from '../errors/user-not-found-error';

interface DeleteUserUseCaseRequest {
  id: string;
}

interface DeleteUserUseCaseResponse {
  deletedUser: User;
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const deletedUser = await this.usersRepository.delete(id);

    return {
      deletedUser,
    };
  }
}
