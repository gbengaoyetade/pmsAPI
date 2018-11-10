import { validationResult } from 'express-validator/check';

const sendValidationErrors = (req, res, next) => {
  const errors = validationResult(req).formatWith(error => error.msg);
  if (!errors.isEmpty()) {
    res.status(400).send({ error: errors.mapped() });
  } else {
    next();
  }
};

export default sendValidationErrors;
