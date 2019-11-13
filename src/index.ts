// src/index.ts
import 'reflect-metadata';
import { createKoaServer } from 'routing-controllers';
import * as cors from '@koa/cors';

import setupDb from './db';
import AdvertisementController from './advertisements/controller';

const port = process.env.PORT || 4000;

const app = createKoaServer({
    controllers: [AdvertisementController],
});
app.use(cors());

setupDb()
    .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
    .catch(err => console.error(err));
