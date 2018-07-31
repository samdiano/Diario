import express from 'express';
import morgan from 'morgan';
import winston from 'winston';
import bodyParser from 'body-parser';
import routes from './server/routes';

const port = process.env.PORT || 8000;
const app = express();

// log every request to
app.use(morgan('tiny'));

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'info' })
  ]
});

// parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

export default app;
