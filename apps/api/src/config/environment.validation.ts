import joi from 'joi';

export default joi.object({
  NODE_ENV: joi.string().valid('development', 'test').default('development'),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().default(5440).required(),
  DB_NAME: joi.string().required(),
  DB_PASS: joi.string().required(),
});
