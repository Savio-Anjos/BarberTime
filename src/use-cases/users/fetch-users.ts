import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface FetchUsersUseCaseResponse {
  users: User[];
}

export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute(): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findAll();

    return { users };
  }
}
