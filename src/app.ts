import express, { Express, Router } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import { RegisterRoutes } from './routes/routes';
import swaggerDocument from './routes/swagger.json';
import googleStrategy from './authStrategy/googleStrategy';

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

export default app;
