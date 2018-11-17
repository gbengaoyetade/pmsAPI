import { validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken';
import { getUserId } from '../utils';
import db from '../models';

const { Users, Locations } = db;
const sendValidationErrors = (req, res, next) => {
  const errors = validationResult(req).formatWith(error => error.msg);
  if (!errors.isEmpty()) {
    res.status(400).send({ error: errors.mapped() });
  } else {
    next();
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (error) => {
      if (error) {
        res.status(401).send({ error: 'Token authentication failure' });
      } else {
        const userId = getUserId(token);
        Users.findOne({ where: { id: userId } }).then((user) => {
          if (user) {
            const userDetails = { email: user.email, id: user.id, role: user.role };
            req.body.currentUser = userDetails;
            next();
          } else {
            res.status(401).send({ error: 'User does not exist on our system' });
          }
        });
      }
    });
  } else {
    res.status(400).send({ error: 'Token not provided' });
  }
};

const verifyParentLocation = async (req, res, next) => {
  const { parentId } = req.body;
  if (!parentId) {
    next();
  } else {
    const location = await Locations.findByPk(parentId);
    if (!location) {
      return res.status(404).send({ error: 'Invalid parentId supplied' });
    }
    next();
  }
  return false;
};
export { sendValidationErrors, verifyToken, verifyParentLocation };
