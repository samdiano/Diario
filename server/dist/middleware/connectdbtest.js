'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  // Initialization Options
  promiseLib: _bluebird2.default
};
const pgp = require('pg-promise')(options);
const connectionString = 'postgres://pjaobuno:E4kEfwo7foXQ-FqAl6FGvtlKRELB9oRv@baasu.db.elephantsql.com:5432/pjaobuno';
const db = pgp(connectionString);

exports.default = db;