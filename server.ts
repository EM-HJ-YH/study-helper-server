import * as express from 'express';
import * as bodyParser from 'body-parser';

export class Server {

    public app: express.Application;

    constructor() {
        this.app = express();

        this.app.get('/console', (res, req) => {
            res.send('Server is Running');
        });

        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());

    }
}

