import { Router } from 'express';
import { UsersController } from './controllers';
import sendValidationErrors from './middleware';
import { routesValidations } from './utils';

const routes = Router();

routes.post(
  '/users',
  routesValidations.createAccount,
  sendValidationErrors,
  UsersController.create,
);

routes.post('/users/login', routesValidations.login, sendValidationErrors, UsersController.login);
export default routes;
