import * as express from 'express';
import { group } from "../model/group.model";
import { auth } from "../../../middlewares/auth.middlewares";

export class GroupRoute {
    public groupRouter: express.Router = express.Router();

    constructor() {
        const idx = this.setGroupIndex();
        this.router();
    }

    async setGroupIndex(): Promise<void> {
        try {
            const result = await group.getGroupIndex();
            if(result == null) await group.setGroupIndex(0);
        }
        catch (err) {
            console.log(err);
        }
    }

    router() {
        this.groupRouter.get('/groups', auth, listGroups);
        this.groupRouter.post('/groups', auth, createGroup);
        this.groupRouter.get('/groups/myGroup/:userId', auth, listMyGroup);
        this.groupRouter.put('/groups/removeMember/:groupIndex/:memberId', auth, removeMember);
        this.groupRouter.put('/groups/:groupIndex', auth, updateGroup);
        this.groupRouter.delete('/groups/:groupIndex', auth, deleteGroup);
    }
}

async function createGroup(req, res): Promise<void> {
    try {
        const groupModel: any = await group.getGroupIndex();
        req.body.groupIndex = groupModel.modelIndex+1;
        const result: any = await group.createGroup(req.body);
        const groupIdxRes: any = await group.incGroupIndex(req.body.groupIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createGroup 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'createGroup 500 : '+err
        });
    }
}

async function listGroups(req, res): Promise<void> {
    try {
        const result: any = await group.listGroup();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listGroups 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'listGroups 500'
        });
    }
}

async function listMyGroup(req, res): Promise<void> {
    const userId: string = req.params.userId;
    try {
        const result: any = await group.listMyGroup(userId);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listMyGroups 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'listMyGroups 500' + err
        });
    }
}

async function removeMember(req, res): Promise<void> {
    const groupIndex: number = req.params.groupIndex;
    const memberId: string = req.params.memberId;
    try {
        const groupData: any = await group.getGroup(groupIndex);
        const result: any = await group.removeMember(groupIndex, memberId, groupData);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'groups::removeMember 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'groups::removeMember 500 >> ' + err
        });
    }
}

async function updateGroup(req, res): Promise<void> {
    const groupIndex: number = req.params.groupIndex;
    try {
        const result: any = await group.updateGroup(groupIndex, req.body);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateGroup 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'updateGroup 500 >> ' + err
        });
    }
}

async function deleteGroup(req, res): Promise<void> {
    const groupIndex: number = req.params.groupIndex;
    try {
        const result: any = await group.deleteGroup(groupIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteGroup 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'deleteGroup 500'
        });
    }
}

export const groupRoutes: GroupRoute = new GroupRoute();