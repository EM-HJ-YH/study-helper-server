import * as express from 'express';
import { board } from "../model/board.model";

export class BoardRoute {
    public boardRouter: express.Router = express.Router();

    constructor() {
        const idx = this.setBoardIndex();
        this.router();
    }

    async setBoardIndex(): Promise<void> {
        try {
            const result = await board.getBoardIndex();
            if (result == null) await board.setBoardIndex(0);
        }
        catch (err) {
            console.log(err);
        }
    }

    router() {
        this.boardRouter.post('/boards', createBoard);
        this.boardRouter.get('/boards', listBoards);
        this.boardRouter.get('/boards/:boardIndex', getBoard)
        this.boardRouter.put('/boards/:boardIndex', updateBoard);
        this.boardRouter.put('/boards/addMember/:boardIndex/:memberId', addMember);
        this.boardRouter.put('/boards/removeMember/:boardIndex/:memberId', removeMember);
        this.boardRouter.put('/boards/endRecruit/:boardIndex', endRecruit);
        this.boardRouter.delete('/boards/:boardIndex', deleteBoard);
    }
}

async  function createBoard(req, res) : Promise<void> {
    try {
        const boardIdx: any = await board.getBoardIndex();
        boardIdx.modelIndex = boardIdx.modelIndex+1;
        req.body.boardIndex = boardIdx.modelIndex;
        const result: any = await board.createBoard(req.body);
        const boardIdxRes: any = await board.incBoardIndex(boardIdx.modelIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createBoard 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'createBoard 500 : '+err
        });
    }
}

async function listBoards(req, res) : Promise<void> {
    try {
        const result: any = await board.listBoard();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listBoard 200'
        })
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'listBoard 500'
        });
    }
}

async function getBoard(req, res) : Promise<void> {
    const boardIndex: number = req.params.boardIndex;
    try {
        const result: any = await board.getBoard(boardIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'getBoard 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'getBoard 500'
        });
    }
}

async function updateBoard(req, res) : Promise<void> {
    const boardIndex: number = req.params.boardIndex;
    try {
        const result: any = await board.updateBoard(boardIndex, req.body);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateBoard 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'updateBoard 500'
        });
    }
}

async function addMember(req, res) : Promise<void> {
    const boardIndex: number = req.params.boardIndex;
    const memberId: string = req.params.memberId;
    try {
        const boardData: any = await board.getBoard(boardIndex);
        const result: any = await board.addMember(boardIndex, memberId, boardData);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'boards::addMember 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'boards::addMember 500 >> ' + err
        });
    }

}

async function removeMember(req, res) : Promise<void> {

}

async function endRecruit(req, res) : Promise<void> {

}

async function deleteBoard(req, res) : Promise<void> {
    const boardIndex: number = req.params.boardIndex;
    try {
        const result: any = await board.deleteBoard(boardIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteBoard 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'deleteBoard 500'
        });
    }
}

export const boardRoutes: BoardRoute = new BoardRoute();