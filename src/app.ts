import express, {
  Express,
  Router,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import { RegisterRoutes } from './routes/routes';
import swaggerDocument from './routes/swagger.json';
import googleStrategy from './authStrategy/googleStrategy';
import connection from './repositories/connect';
import EnumHttpStatus from './models/enums/EnumHttpStatus';
import EnumResponseError from './models/enums/EnumResponseError';

try {
  connection.sync();
} catch (error) {
  console.error('DB Connect Fail');
}

const app: Express = express();
app.use(express.json());
app.use(cors());

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
  // @ts-ignore
  if (err.status) {
    // @ts-ignore
    switch (err.status) {
      case EnumHttpStatus.ValidationFailed: {
        return res.status(EnumHttpStatus.ValidationFailed).json({
          errorMessage: EnumHttpStatus[EnumHttpStatus.ValidationFailed],
        });
      }
      case EnumHttpStatus.PleaseLoginFirst: {
        return res.status(EnumHttpStatus.PleaseLoginFirst).json({
          errorMessage: EnumHttpStatus[EnumHttpStatus.PleaseLoginFirst],
        });
      }
      default: {
        break;
      }
    }
  }

  switch (err.message) {
    case EnumResponseError[EnumResponseError.EmailExists]: {
      return res.status(EnumHttpStatus.ValidationFailed).json({
        errorMessage: err.message,
      });
    }
    case EnumResponseError[EnumResponseError.InternalError]: {
      return res.status(EnumHttpStatus.InternalError).json({
        errorMessage: err.message,
      });
    }
    default: {
      break;
    }
  }
  next();
});

export default app;
