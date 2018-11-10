import { body } from 'express-validator/check';

const routesValidations = {
  createAccount: [
    body('email')
      .exists()
      .withMessage('email field is required')
      .trim()
      .isEmail()
      .withMessage('Expect an email address'),
    body('password')
      .exists()
      .withMessage('password field is required')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password length cannot be less than 6 characters'),
  ],
};

export default routesValidations;
