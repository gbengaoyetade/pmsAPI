import routesValidations from './routesValidations';

const sendInternalServerError = res => res
  .status(500)
  .send({ error: 'Our server encountered an error while trying to process your request' });

export { routesValidations, sendInternalServerError };
