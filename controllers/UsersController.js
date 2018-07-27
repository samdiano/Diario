import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import promise from 'bluebird';

const options = {
  // Initialization Options
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const connectionString = 'postgres://zehxatan:EP22Gmb985sp3eXwp2z94Hz-9nlbr4D4@stampy.db.elephantsql.com:5432/zehxatan';
const db = pgp(connectionString);

const validateSignUp = (user) => {
  const schema = {
    email: Joi.string().min(5).max(255).required()
      .email(),
    password: Joi.string().min(5).max(255).required(),
    full_name: Joi.string().min(5).max(255).required()

  };
  return Joi.validate(user, schema);
};

const validateSignIn = (user) => {
  const schema = {
    email: Joi.string().min(5).max(255).required()
      .email(),
    password: Joi.string().min(5).max(255).required()

  };
  return Joi.validate(user, schema);
};

class UsersController {
  static async signIn(req, res) {
    const { error } = validateSignIn(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message, status: 'Failed' });
    const user = await db.any('SELECT * FROM users where email = $1', req.body.email);
    const validPassword = await bcrypt.compare(req.body.password, user[0].password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password', status: 'Failed' });
    const token = jwt.sign({ id: user[0].id }, 'samuel', { expiresIn: 86400 });
    res.header('x-auth-token', token).status(200).json({ status: 'success', user: user[0].full_name, message: 'Login succesful' });
  }
  static async signUp(req, res) {
    const { error } = validateSignUp(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message, status: 'Failed' });
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await db.any('insert into users(full_name, email, password) values(${full_name}, ${email}, ${password})', req.body);
    res.status(201).json({ status: 'success', message: 'Inserted one user' });
  }
}

export default UsersController;
