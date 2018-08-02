import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../middleware/connectdb';
import validateSignIn from '../helpers/validateSignIn';
import validateSignUp from '../helpers/validateSignup';
import validateUser from '../helpers/validateUser';

class UsersController {
  // Sign in user
  static async signIn(req, res) {
    const { error } = validateSignIn(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message, status: 'Failed'
      });
    }

    const user = await db.any('SELECT * FROM users where email = $1', req.body.email);

    const validPassword = await bcrypt.compare(req.body.password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Invalid email or password', status: 'Failed'
      });
    }

    const token = jwt.sign({ id: user[0].id }, 'oiraid', { expiresIn: 86400 });
    res.header('x-auth-token', token).status(200).json({
      status: 'success', user: user[0].full_name, message: 'Login succesful'
    });
  }
  // Sign up user
  static async signUp(req, res) {
    const { error } = validateSignUp(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message, status: 'Failed'
      });
    }

    const users = await db.result('SELECT email FROM users');

    const existingUser = users.rows.find(user =>
      (user.email.toLowerCase() === req.body.email.toLowerCase()));

    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists', status: 'Failed'
      });
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    await db.result('insert into users(full_name, email, password) values(${full_name}, ${email}, ${password})', req.body);
    const result = await db.any('SELECT id, email, created_at FROM users where email = $1', req.body.email);
    const token = jwt.sign({ id: result[0].id }, 'oiraid', { expiresIn: 86400 });
    res.header('x-auth-token', token).status(201).json({
      status: 'success', users: result[0], message: 'Inserted one user'
    });
  }
  static async getUser(req, res) {
    const user = await db.any('SELECT email, full_name, created_at FROM users where id = $1', [req.user.id]);
    res.status(200).json({
      status: 'success', user, message: 'User details retrieved successfully '
    });
  }
  // modify fields in an entry
  static async updateUser(req, res) {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message, status: 'Failed'
      });
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await db.result('update users set full_name=$1, password=$2 where id=$3', [req.body.full_name, req.body.password, req.user.id]);
    res.status(200).json({
      status: 'success', message: 'Profile updated successfully'
    });
  }
}

export default UsersController;
