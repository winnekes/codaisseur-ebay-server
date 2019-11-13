// src/index.ts
import 'reflect-metadata';
import { createKoaServer, Action } from 'routing-controllers';

import setupDb from './db';
import { verify } from './jwt';

import AdvertisementController from './advertisements/controller';

const port = process.env.PORT || 4000;

const app = createKoaServer({
    cors: true,
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

setupDb()
    .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
    .catch(err => console.error(err));
