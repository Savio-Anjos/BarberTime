import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { fastifyCors } from '@fastify/cors';
import { usersRoutes } from './http/controllers/routes';

export const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.register(usersRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  reply.status(500).send({ message: 'Internal server error.' });
});

app.get('/', async (_, res) => {
  res.send('Welcome to the BarberTime API');
});
