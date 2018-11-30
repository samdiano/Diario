'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateEntry = entry => {
  const schema = {
    title: _joi2.default.string().min(3).trim().required(),
    body: _joi2.default.string().min(3).trim().required(),
    userid: _joi2.default.number().min(1)
  };
  return _joi2.default.validate(entry, schema);
};

exports.default = validateEntry;