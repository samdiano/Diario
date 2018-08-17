import Joi from 'joi';

const validateReminder = (date) => {
  const schema = {
    date: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  };
  return Joi.validate(date, schema);
};

export default validateReminder;

