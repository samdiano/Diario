'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateReminder = date => {
  const schema = {
    remind: _joi2.default.boolean().required()
  };
  return _joi2.default.validate(date, schema);
};

exports.default = validateReminder;