import * as express from 'express';
import { signIn } from "../model/signIn.model";

export class SignInRoutes {
    public signInRoutes: express.Router = express.Router();

    constructor() {
        const idx = this.setUserIndex();
        this.router();
    }

    async setUserIndex(): Promise<void> {
        try {
            const result = await signIn.getUserIndex();
            if (result == null) await signIn.setUserIndex(0);
        }
        catch (err) {
            console.log(err);
        }
    }

    router() {
        this.signInRoutes.post('/signInUser', signInUser);
        this.signInRoutes.post('/signInAdmin', signInAdmin);
    }
}

async function signInUser(req, res): Promise<void> {
    try {
        const userIdx: any = await signIn.getUserIndex();
        userIdx.modelIndex = userIdx.modelIndex+1;
        const userIdxRes: any = await signIn.incUserIndex(userIdx.modelIndex);
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
                    message: 'signInUser 500 ' + err
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

async function signInAdmin(req, res): Promise<void> {
    try {
        const result: any = await signIn.signInAdmin(req.body);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'signInAdmin 200'
        });
    }
    catch (err) {
        switch(err) {
            case 'server error':
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'signInAdmin 500 ' + err
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