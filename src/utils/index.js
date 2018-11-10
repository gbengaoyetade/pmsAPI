import routesValidations from './routesValidations';
import db from '../models';

const { Users, Locations } = db;

const sendInternalServerError = res => res
  .status(500)
  .send({ error: 'Our server encountered an error while trying to process your request' });

const emptyDatabase = async () => {
  await Users.destroy({ truncate: true, restartIdentity: true });
  await Locations.destroy({ truncate: true, restartIdentity: true });
};
export { routesValidations, sendInternalServerError, emptyDatabase };
