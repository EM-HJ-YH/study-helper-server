import * as express from 'express';
import { UserResource } from "../../../resources/user.resource";
import { user } from "../model/user.model";
import { auth } from "../../../middlewares/auth.middlewares";

export class UserRoutes {
    public userRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    router() {
        //this.userRouter.use(auth);
        this.userRouter.post('/users', createUser);
        this.userRouter.get('/users', listUsers);
        this.userRouter.get('/users/:userId', getUser);
        this.userRouter.put('/users/:userId', updateUser);
        this.userRouter.delete('/users/:userId', deleteUser);
    }
}

async function createUser(req, res) : Promise<void> {
    const userData: any = new UserResource();
    userData.setUserResource(req.body);
    try {
        const result: any = await user.createUser(userData.getUserResource());
        res.send({
           success: true,
           statusCode: 200,
           result: result,
           message: 'createUser 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'createUser 500'
        });
    }
}

async function listUsers(req, res) : Promise<void> {
    try {
        const result: any = await user.listUser();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listUser 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'listUser 500'
        });
    }
}

async function getUser(req, res): Promise<void> {
    const userId: string = req.params.userId;
    try {
        const result: any = await user.getUser(userId);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'getUser 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'getUser 500'
        });
    }
}

async function updateUser(req, res): Promise<void> {
    const userId: string = req.params.userId;
    const userData: any = new UserResource();
    userData.updateUserResource(req.body);
    try {
        const result: any = await user.updateUser(userId, userData.getUserResource());
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateUser 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'updateUser 500'
        });
    }
}

async function deleteUser(req, res): Promise<void> {
    const userId: string = req.params.userId;
    try {
        const result: any = await user.deleteUser(userId);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteUser 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'deleteUser 500'
        });
    }
}

export const userRoutes: UserRoutes = new UserRoutes();