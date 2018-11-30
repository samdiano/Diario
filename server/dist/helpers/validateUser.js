'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateUser = user => {
  const schema = {
    full_name: _joi2.default.string().min(5).trim().max(255).required(),
    email: _joi2.default.string().min(5).trim().max(255).required().email()
  };
  return _joi2.default.validate(user, schema);
};

exports.default = validateUser;