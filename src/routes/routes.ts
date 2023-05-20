import { Router } from 'express';

import { complaintsRouter } from './complaints';
import { informationsRouter } from './informations';

export const routes = Router();

routes.get('/', (req, res) => {
    return res.sendFile(__dirname+'/static/index.html');
});

routes.get('/version', (req, res) => res.json({version: '1.0.0'}));

routes.use('/complaints', complaintsRouter);
routes.use('/informations', informationsRouter);