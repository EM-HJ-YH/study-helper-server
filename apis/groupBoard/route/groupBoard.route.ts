import * as express from 'express';
import { groupBoard } from "../model/groupBoard.model";
import { auth } from "../../../middlewares/auth.middlewares";

export class GroupBoardRoute {
    public groupBoardRouter: express.Router = express.Router();

    constructor() {
        const idx = this.setGroupBoardIndex();
        this.router();
    }

    async setGroupBoardIndex(): Promise<void> {
        try {
            const result = await groupBoard.getGroupBoardIndex();
            if(result == null) await groupBoard.setGroupBoardIndex(0);
        } catch (err) {
            console.log(err);
        }
    }

    router() {
        this.groupBoardRouter.get('/groupBoards', auth, listGroupBoard);
        this.groupBoardRouter.post('/groupBoards', auth, createGroupBoard);
        this.groupBoardRouter.get('/groupBoards/:groupBoardIndex', auth, getGroupBoardByIndex);
        this.groupBoardRouter.get('/groupBoards/group/:groupIndex', auth, getGroupBoardByGroup)
        this.groupBoardRouter.put('/groupBoards/:groupBoardIndex', auth, updateGroupBoard);
        this.groupBoardRouter.delete('/groupBoards/:groupBoardIndex', auth, deleteGroupBoard);
    }
}

async function createGroupBoard(req, res): Promise<void> {
    try {
        const groupBoardModel: any = await groupBoard.getGroupBoardIndex();
        req.body.groupBoardIndex = groupBoardModel.modelIndex+1;
        const result: any = await groupBoard.createGroupBoard(req.body);
        const groupBoardIdxRes: any = await groupBoard.incGroupBoardIndex(req.body.groupBoardIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createGroupBoard 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'createGroupBoard 500 : ' + err
        });
    }
}

async function listGroupBoard(req, res): Promise<void> {
    try {
        const result: any = await groupBoard.listGroupBoard();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listGroupBoard 200'
        })
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'listGroupBoard 500' + err
        });
    }
}

async function getGroupBoardByIndex(req, res): Promise<void> {
    const groupBoardIndex: number = req.params.groupBoardIndex;
    try {
        const result: any = await groupBoard.getGroupBoardByIndex(groupBoardIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'getGroupBoardByIndex 200'
        })
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'getGroupBoardByIndex 500' + err
        });
    }
}

async function getGroupBoardByGroup(req, res): Promise<void> {
    const groupIndex: number = req.params.groupIndex;
    try {
        const result: any = await groupBoard.getGroupBoardByGroup(groupIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'getGroupBoardByGroup 200'
        })
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'getGroupBoardByGroup 500' + err
        });
    }
}

async function updateGroupBoard(req, res): Promise<void> {
    const groupBoardIndex: number = req.params.groupBoardIndex;
    try {
        const result: any = await groupBoard.updateGroupBoard(groupBoardIndex, req.body);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateGroupBoard 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'updateGroupBoard 500' + err
        });
    }
}

async function deleteGroupBoard(req, res): Promise<void> {
    const groupBoardIndex: number = req.params.groupBoardIndex;
    try {
        const result: any = await groupBoard.deleteGroupBoard(groupBoardIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteGroupBoard 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'deleteGroupBoard 500' + err
        });
    }
}

export const groupBoardRoutes: GroupBoardRoute = new GroupBoardRoute();