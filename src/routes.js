import { Router } from 'express';
import { UsersController, LocationsController } from './controllers';
import {
  sendValidationErrors,
  verifyToken,
  verifyParentLocation,
} from './middleware';
import { routesValidations } from './utils';

const routes = Router();

routes.post(
  '/users',
  routesValidations.createAccount,
  sendValidationErrors,
  UsersController.create,
);

routes.post(
  '/users/login',
  routesValidations.login,
  sendValidationErrors,
  UsersController.login,
);
routes.post(
  '/location',
  routesValidations.createLocation,
  sendValidationErrors,
  verifyToken,
  verifyParentLocation,
  LocationsController.create,
);
export default routes;
