import db from '../models';
import { sendInternalServerError } from '../utils';

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
}

export default UsersController;
