import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error';
import { makeDeleteUserUseCase } from '@/use-cases/factories/make-delete-user-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteUserParamsSchema.parse(request.params);

  try {
    const deleteUserUseCase = makeDeleteUserUseCase();

    const deletedUser = await deleteUserUseCase.execute({
      id,
    });

    reply.status(200).send(deletedUser);
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
