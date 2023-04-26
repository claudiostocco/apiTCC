import express from 'express';
import cors from 'cors';

import { routes } from './routes/routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

// https://dev.to/rogeriorioli/iniciando-um-projeto-nodejs-express-com-typescript-4bfl

app.listen(3003);