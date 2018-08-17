import Joi from 'joi';

const validateReminder = (date) => {
  const schema = {
    remind: Joi.boolean().required(),
  };
  return Joi.validate(date, schema);
};

export default validateReminder;

