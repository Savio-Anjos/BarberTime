import { makeFetchUsersUseCase } from '@/use-cases/factories/make-fetch-users-use-case';
import { FastifyRequest, FastifyReply,  } from 'fastify';

export async function fetchUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchUsersUseCase = makeFetchUsersUseCase();

    const users = await fetchUsersUseCase.execute();

    reply.status(200).send(users);
  } catch (err) {
    throw err;
  }
}
