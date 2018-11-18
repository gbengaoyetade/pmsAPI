import jwt from 'jsonwebtoken';
import routesValidations from './routesValidations';
import db from '../models';
import { user, now } from './constants';

const { Users, Locations } = db;

const sendInternalServerError = res => res.status(500).send({
  error:
      'Our server encountered an error while trying to process your request',
});

const emptyDatabase = async () => {
  await Users.destroy({ truncate: true, restartIdentity: true });
  await Locations.destroy({ truncate: true, restartIdentity: true });
};

const seedDatabase = async () => {
  await Users.create(user);
};

const generateToken = (payload) => {
  const secret = process.env.SECRET;
  const userToken = jwt.sign({ ...payload }, secret, { expiresIn: '24h' });
  return userToken;
};

const getUserId = (token) => {
  const decodedToken = jwt.decode(token, process.env.SECRET);
  return decodedToken.userId;
};

export {
  routesValidations,
  sendInternalServerError,
  emptyDatabase,
  generateToken,
  getUserId,
  seedDatabase,
  now,
  user,
};
