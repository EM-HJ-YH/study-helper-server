import * as express from 'express';
import { signIn } from "../model/signIn.model";

export class SignInRoutes {
    public signInRoutes: express.Router = express.Router();

    constructor() {
        this.router();
    }

    router() {
        this.signInRoutes.post('/signInUser', signInUser);
    }
}

async function signInUser(req, res): Promise<void> {
    try {
        let result: any = await signIn.signInUser(req.body);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'signInUser 200'
        });
    }
    catch (err) {
        switch(err) {
            case 'server error':
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'signInUser 500'
                });
                break;
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: err
                });
        }
    }
}

export const signInRoutes: SignInRoutes = new SignInRoutes();