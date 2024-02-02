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
  switch (err.status) {
    case 400: {
      return res.status(400).json({
        errorMessage: 'Validation Failed',
      });
    }
    case 401: {
      return res.status(401).json({
        errorMessage: 'Please Login First',
      });
    }
    default: {
      break;
    }
  }
  next();
});

export default app;
