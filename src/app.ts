import express, { Express, Router } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes';
import swaggerDocument from './routes/swagger.json';

const app: Express = express();
app.use(express.json());
app.use(cors());

const router = Router();
RegisterRoutes(router);

app.use('/', router);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default app;
