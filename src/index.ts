// src/index.ts
import 'reflect-metadata';
import { createKoaServer, Action } from 'routing-controllers';
import * as cors from '@koa/cors';

import setupDb from './db';
import AdvertisementController from './advertisements/controller';
import { verify } from './jwt';

const port = process.env.PORT || 4000;

const app = createKoaServer({
    controllers: [AdvertisementController],
    authorizationChecker: (action: Action) => {
        const header: string = action.request.headers.authorization;

        if (header && header.startsWith('Bearer ')) {
            const [, token] = header.split(' ');
            return !!(token && verify(token));
        }
        // ...
        return false;
    },
});
app.use(cors());

setupDb()
    .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
    .catch(err => console.error(err));
