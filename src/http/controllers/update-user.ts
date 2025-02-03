import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error';
import { makeUpdateUserUseCase } from '@/use-cases/factories/make-update-user-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateUserBodySchema = z.object({
    name: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(255).optional(),
  });

  const updateUserParamsSchema = z.object({
    id: z.string(),
  });

  const { name, email, password } = updateUserBodySchema.parse(request.body);
  const { id } = updateUserParamsSchema.parse(request.params);

  try {
    const updateUserUseCase = makeUpdateUserUseCase();

    const updatedUser = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
    });

    reply.status(200).send(updatedUser);
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
