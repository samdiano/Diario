'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _connectdb = require('../middleware/connectdb');

var _connectdb2 = _interopRequireDefault(_connectdb);

var _validateSignIn = require('../helpers/validateSignIn');

var _validateSignIn2 = _interopRequireDefault(_validateSignIn);

var _validateSignup = require('../helpers/validateSignup');

var _validateSignup2 = _interopRequireDefault(_validateSignup);

var _validateUser = require('../helpers/validateUser');

var _validateUser2 = _interopRequireDefault(_validateUser);

var _validateReminder = require('../helpers/validateReminder');

var _validateReminder2 = _interopRequireDefault(_validateReminder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  // Sign in user
  static async signIn(req, res) {
    const { error } = (0, _validateSignIn2.default)(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const user = await _connectdb2.default.any('SELECT * FROM users where email = $1', req.body.email);

    const validPassword = await _bcrypt2.default.compare(req.body.password, user[0].password);
    if (!validPassword) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const token = _jsonwebtoken2.default.sign({ id: user[0].id }, process.env.jwt_key, { expiresIn: 86400 });
    res.header('x-auth-token', token).status(200).json({
      user: user[0].full_name, message: 'Login succesful'
    });
  }
  // Sign up user
  static async signUp(req, res) {
    const { error } = (0, _validateSignup2.default)(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const users = await _connectdb2.default.result('SELECT email FROM users');

    const existingUser = users.rows.find(user => user.email.toLowerCase() === req.body.email.toLowerCase());

    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists'
      });
    }
    const salt = await _bcrypt2.default.genSalt(10);
    req.body.password = await _bcrypt2.default.hash(req.body.password, salt);

    await _connectdb2.default.result('insert into users(full_name,email,password) values(${full_name},${email},${password})', req.body);
    const result = await _connectdb2.default.any('SELECT id, email, created_at FROM users where email = $1', req.body.email);
    const token = _jsonwebtoken2.default.sign({ id: result[0].id }, process.env.jwt_key, { expiresIn: 86400 });
    res.header('x-auth-token', token).status(201).json({
      users: result[0], message: 'Account created successfully'
    });
  }
  static async getUser(req, res) {
    const user = await _connectdb2.default.any('SELECT email, full_name, created_at FROM users where id = $1', [req.user.id]);
    res.status(200).json({
      user, message: 'User details retrieved successfully '
    });
  }
  // modify user details
  static async updateUser(req, res) {
    const { error } = (0, _validateUser2.default)(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }
    await _connectdb2.default.result('update users set full_name=$1, email=$2 where id=$3', [req.body.full_name, req.body.email, req.user.id]);
    res.status(200).json({
      message: 'Profile updated successfully'
    });
  }
  // Set Reminder
  static async setReminder(req, res) {
    const { error } = (0, _validateReminder2.default)(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }
    await _connectdb2.default.any('update users set reminder=$1 where id=$2', [req.body.remind, req.user.id]);
    res.status(200).json({ message: 'Reminder set succesfully' });
  }
  // get reminder time
  static async getReminder(req, res) {
    const time = await _connectdb2.default.any('SELECT reminder FROM users where id = $1', req.user.id);
    if (time[0].reminder === false) {
      res.status(404).json({ time, message: 'No reminder set' });
    }
    res.status(200).json({ time, message: 'Reminder active' });
  }
}

exports.default = UsersController;