import express, {
  Express,
  Router,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import { RegisterRoutes } from './routes/routes';
import swaggerDocument from './routes/swagger.json';
import googleStrategy from './authStrategy/googleStrategy';
import connection from './repositories/connect';
import EnumHttpStatus from './models/enums/EnumHttpStatus';
import ApiResponseError from './models/ApiResponseError';
import ApiResponse from './models/ApiResponse';

try {
  connection.sync();
} catch (error) {
  console.error('DB Sync Fail');
}

const app: Express = express();
app.use(express.json());

const router = Router();
RegisterRoutes(router);

app.use('/', router);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.get('/failed', (req, res) => {
  res.send('Failed');
});

passport.use(googleStrategy);

app.use((
  err: Error,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction,
): ExResponse | void => { /* eslint-disable-line consistent-return */
  if (err instanceof ApiResponseError) {
    return res.status(err.httpStatus).json(new ApiResponse(err.message));
  }

  // @ts-ignore
  if (err.status && err.status === EnumHttpStatus.ValidationFailed) {
    return res.status(EnumHttpStatus.ValidationFailed).json(new ApiResponse(EnumHttpStatus[EnumHttpStatus.ValidationFailed]));
  }

  next();
});

export default app;
