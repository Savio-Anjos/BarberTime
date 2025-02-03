import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeCreateUserUseCase } from "@/use-cases/factories/make-create-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
  });

  const { name, email, password } = createUserBodySchema.parse(request.body);

  try {
    const createUserUseCase = makeCreateUserUseCase();

    const user = await createUserUseCase.execute({ name, email, password });

    reply.status(201).send(user);
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }
}
