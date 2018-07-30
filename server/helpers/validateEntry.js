import Joi from 'joi';

const validateEntry = (entry) => {
  const schema = {
    title: Joi.string().min(3).trim().required(),
    body: Joi.string().min(3).trim().required(),
    userid: Joi.number().min(1)
  };
  return Joi.validate(entry, schema);
};

export default validateEntry;

