import * as express from 'express';
import { userModel } from "../model/user.model";
import { UserResource } from "../../../resources/user.resource";

export class UserRoutes {
    public userRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    router() {
        this.userRouter.post('/users', createUser);
        this.userRouter.get('/users', listUsers);
        this.userRouter.get('/users/:userId', getUser);
        this.userRouter.put('/users/:userId', updateUser);
        this.userRouter.delete('/users/:userId', deleteUser);
    }
}

function createUser(req, res) {
    const userData: any = new UserResource(req.body);
    userModel.create(userData.getUserResource(), (err, result) => {
        if(err) return res.json(err);
        res.send(result);
    });
}

function listUsers(req, res) {
    userModel.find({}, (err, results) => {
        if(err) return res.json(err);
        res.send(results);
    });
}

function getUser(req, res) {
    let userId: string = req.params.userId;
    userModel.findOne({userId:userId}, (err, result) => {
        if(err) return res.json(err);
        res.send(result);
    });
}

function updateUser(req, res) {
    let userId: string = req.params.userId;
    userModel.findOneAndUpdate({userId:userId}, req.body, {new: true}, (err, result) => {
        if(err) return res.json(err);
        res.send(result);
    });
}

function deleteUser(req, res) {
    let userId: string = req.params.userId;
    userModel.remove({userId:userId}, (err) => {
        if(err) return res.json(err);
        res.send("delete user");
    });
}

export const userRoutes: UserRoutes = new UserRoutes();