import bcrypt from 'bcryptjs';
import db from '../models';
import { sendInternalServerError, generateToken } from '../utils';

const { Users } = db;

class UsersController {
  static create(req, res) {
    const { email, password } = req.body;

    Users.create({ email, password })
      .then((user) => {
        const userDetails = {
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
        return res.status(201).send({ message: 'User created successfully', user: userDetails });
      })
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).send({ error: 'Email address already in use' });
        }
        return sendInternalServerError(res);
      });
  }

  static login(req, res) {
    const { email, password } = req.body;
    Users.findOne({ where: { email } }).then((user) => {
      if (!user) {
        res.status(401).send({ error: 'Incorrect email address supplied' });
      } else {
        const isCorrectPassword = bcrypt.compareSync(password, user.password);
        if (isCorrectPassword) {
          const token = generateToken({ email, role: user.role });
          res.send({ message: 'Login successful', token });
        } else {
          res.status(401).send({ error: 'Incorrect password supplied' });
        }
      }
    });
  }
}

export default UsersController;
