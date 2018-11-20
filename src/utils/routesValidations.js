import { body, query, param } from 'express-validator/check';

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
  login: [
    body('email')
      .exists()
      .withMessage('Requires email field'),
    body('password')
      .exists()
      .withMessage('Requires password field'),
  ],
  createLocation: [
    body('name')
      .exists()
      .withMessage('name field is required')
      .trim()
      .isLength({ min: 2 })
      .withMessage('name length cannot be less than two characters')
      .matches(/^([a-zA-Z]+\s*)+$/)
      .withMessage('Name not properly formed'),
    body('totalFemale')
      .exists()
      .withMessage('totalFemale field is required')
      .trim()
      .isNumeric()
      .withMessage('Expects a numeric value'),
    body('totalMale')
      .exists()
      .withMessage('totalMale field is required')
      .isNumeric()
      .withMessage('Expects a numeric value'),
    body('parentId')
      .optional()
      .trim()
      .isNumeric()
      .withMessage('Expects a numeric value'),
  ],

  getAllLocation: [
    query('limit')
      .trim()
      .optional()
      .isNumeric()
      .withMessage('limit has to be a number'),
    query('offset')
      .trim()
      .optional()
      .isNumeric()
      .withMessage('offset has to be a number'),
  ],

  deleteLocation: [
    param('id')
      .trim()
      .isNumeric()
      .withMessage('Expects a numeric value for id'),
  ],
  updateLocation: [
    param('id')
      .trim()
      .isNumeric()
      .withMessage('Expects a numeric value for id'),
    body('totalMale')
      .optional()
      .trim()
      .isNumeric()
      .withMessage('Expects a numeric value for id'),
    body('totalFemale')
      .optional()
      .trim()
      .isNumeric()
      .withMessage('Expects a numeric value for id'),
    body('name')
      .optional()
      .withMessage('name field is required')
      .trim()
      .isLength({ min: 2 })
      .withMessage('name length cannot be less than two characters')
      .matches(/^([a-zA-Z]+\s*)+$/)
      .withMessage('Name not properly formed'),
  ],
};

export default routesValidations;
