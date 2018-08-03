import Joi from 'joi';
const validateSignIn = (user) => {
  const schema = {
    email: Joi.string().min(5).trim().max(255).required()
      .email(),
    password: Joi.string().trim().min(5).max(255).required()

  };
  return Joi.validate(user, schema);
};

export default validateSignIn;
