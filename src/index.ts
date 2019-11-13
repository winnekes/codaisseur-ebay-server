// src/index.ts
import 'reflect-metadata';
import { createKoaServer } from 'routing-controllers';
import ProductController from './products/controller';
import setupDb from './db';

const port = process.env.PORT || 4000;

const app = createKoaServer({
    controllers: [ProductController],
});

setupDb()
    .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
    .catch(err => console.error(err));
