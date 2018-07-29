import Joi from 'joi';

const validateSignUp = (user) => {
  const schema = {
    email: Joi.string().min(5).max(255).required()
      .email(),
    password: Joi.string().min(5).max(255).required(),
    full_name: Joi.string().min(5).max(255).required()

  };
  return Joi.validate(user, schema);
};

export default validateSignUp;
