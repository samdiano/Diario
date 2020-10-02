'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _yamljs = require('yamljs');

var _yamljs2 = _interopRequireDefault(_yamljs);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 9000;
const app = (0, _express2.default)();

const apiDoc = _yamljs2.default.load(`${process.cwd()}/swagger.yaml`);
app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(apiDoc));

const corsOptions = {
  exposedHeaders: 'Authorization'
};

app.use((0, _cors2.default)(corsOptions));
// log every request to
app.use((0, _morgan2.default)('tiny'));

const logger = new _winston2.default.Logger({
  transports: [new _winston2.default.transports.Console({ level: 'info' })]
});
// parse incoming request data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

(0, _routes2.default)(app);
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

exports.default = app;