import jwt from 'jsonwebtoken';
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

const generateToken = (payload) => {
  const secret = process.env.SECRET;
  const userToken = jwt.sign({ ...payload }, secret, { expiresIn: '24h' });
  return userToken;
};
export {
  routesValidations, sendInternalServerError, emptyDatabase, generateToken,
};
