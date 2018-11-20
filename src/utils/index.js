import jwt from 'jsonwebtoken';
import routesValidations from './routesValidations';
import db from '../models';
import {
  user, now, DEFAULT_LIMIT, DEFAULT_OFFSET,
} from './constants';

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

const updateParentLocation = async (childLocation, isDelete) => {
  const {
    totalMale, totalFemale, parentId, total,
  } = childLocation;
  const parentLocation = await Locations.findByPk(parentId);
  let newParentLocation = {
    totalFemale: Number(parentLocation.totalFemale) + Number(totalFemale),
    totalMale: Number(parentLocation.totalMale) + Number(totalMale),
    total: Number(parentLocation.total) + Number(total),
  };
  if (isDelete) {
    newParentLocation = {
      totalFemale: Number(parentLocation.totalFemale) - Number(totalFemale),
      totalMale: Number(parentLocation.totalMale) - Number(totalMale),
      total: Number(parentLocation.total) - Number(total),
    };
  }
  await Locations.update({ ...newParentLocation }, { where: { id: parentId } });
};

export {
  routesValidations,
  sendInternalServerError,
  emptyDatabase,
  generateToken,
  getUserId,
  seedDatabase,
  updateParentLocation,
  now,
  user,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
};
