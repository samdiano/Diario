'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

  try {
    const decoded = _jsonwebtoken2.default.verify(token, process.env.jwt_key);
    req.user = decoded;
    next();
  } catch (exception) {
    res.status(400).json({ message: 'Invalid token' });
  }
};