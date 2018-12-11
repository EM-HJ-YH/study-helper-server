import * as express from 'express';
import { cafe } from "../model/cafe.model";
import { auth } from "../../../middlewares/auth.middlewares";

export class CafeRoute {
    public cafeRouter: express.Router = express.Router();

    constructor() {
        const idx = this.setCafeIndex();
        this.router();
    }

    async setCafeIndex(): Promise<void> {
        try {
            const result = await cafe.getCafeIndex();
            if(result == null) await cafe.setCafeIndex(0);
        }
        catch (err) {
            console.log(err);
        }
    }

    router() {
        this.cafeRouter.post('/cafes', auth, createCafe);
        this.cafeRouter.get('/cafes', auth, listCafe);
        this.cafeRouter.put('/cafes/:cafeIndex', auth, updateCafe);
        this.cafeRouter.delete('/cafes/:cafeIndex', auth, deleteCafe);
    }
}

async function createCafe(req, res): Promise<void> {
    try {
        const cafeIdx: any = await cafe.getCafeIndex();
        req.body.cafeIndex = cafeIdx.modelIndex+1;
        const result: any = await cafe.createCafe(req.body);
        const cafeIdxRes: any = await cafe.incCafeIndex(cafeIdx.modelIndex+1);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createCafe 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'createCafe 500 : '+err
        });
    }
}

async function listCafe(req, res): Promise<void> {
    try {
        const result: any = await cafe.listCafe();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listCafe 200'
        })
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'listCafe 500 : ' + err
        });
    }
}

async function updateCafe(req, res): Promise<void> {
    const cafeIndex: number = req.params.cafeIndex;
    try {
        const result: any = await cafe.updateCafe(cafeIndex, req.body);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateCafe 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'updateCafe 500 : ' + err
        });
    }
}

async function deleteCafe(req, res): Promise<void> {
    const cafeIndex: number = req.params.cafeIndex;
    try {
        const result: any = await cafe.deleteCafe(cafeIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteCafe 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'deleteCafe 500'
        });
    }
}

export const cafeRoutes: CafeRoute = new CafeRoute();