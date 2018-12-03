import * as express from 'express';
import * as bodyParser from 'body-parser';
//import * as cors from 'cors';

import { userRoutes } from "./apis/user/route/user.route";
import { signInRoutes } from "./apis/sign/route/signIn.route";
import { boardRoutes } from "./apis/board/route/board.route";
import { groupRoutes } from "./apis/group/route/group.route";

export class Server {

    public app: express.Application;

    constructor() {
        this.app = express();

        this.app.get('/console', (res, req) => {
            res.send('Server is Running');
        });

        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());

        /*** allow Cross Origin Resource Sharing ***/
        //this.app.use(cors);
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
            next();
        });

        /*** add Router ***/
        this.app.use(userRoutes.userRouter);
        this.app.use(signInRoutes.signInRoutes);

        /*** do adding token verify code ***/
        this.app.use(boardRoutes.boardRouter);
        this.app.use(groupRoutes.groupRouter);
    }
}

