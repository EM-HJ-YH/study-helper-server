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
        this.groupBoardRouter.get('/groupBoards', listGroupBoard);
        this.groupBoardRouter.use(auth);
        this.groupBoardRouter.post('/groupBoards', createGroupBoard);
        this.groupBoardRouter.put('/groupBoards/:groupBoardIndex', updateGroupBoard);
        this.groupBoardRouter.delete('/groupBoards/:groupBoardIndex', deleteGroupBoard);
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