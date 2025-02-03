import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { fetchUsers } from './fetch-users';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUser);
  app.get('/users', fetchUsers);
}
