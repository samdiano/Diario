import Joi from 'joi';

const validateUser = (user) => {
  const schema = {
    full_name: Joi.string().min(5).max(255),
    password: Joi.string().min(5)
  };
  return Joi.validate(user, schema);
};

export default validateUser;
