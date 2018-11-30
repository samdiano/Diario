import express from 'express';
import morgan from 'morgan';
import winston from 'winston';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import routes from './server/routes';

const port = process.env.PORT || 9000;
const app = express();

const apiDoc = YAML.load(`${process.cwd()}/swagger.yaml`);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));


// const corsOptions = {
//   exposedHeaders: 'Authorization',
// };

app.use(cors());

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
