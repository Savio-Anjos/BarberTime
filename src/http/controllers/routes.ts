import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { fetchUsers } from './fetch-users';
import { updateUser } from './update-user';
import { deleteUser } from './delete-user';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUser);
  app.get('/users', fetchUsers);
  app.put('/users/:id', updateUser);
  app.delete('/users/:id', deleteUser);
}
