import * as express from 'express';
import { cafeBook } from "../model/cafeBook.model";
import { auth } from "../../../middlewares/auth.middlewares";

export class CafeBookRoute {
    public cafeBookRouter: express.Router = express.Router();

    constructor() {
        const idx = this.setCafeBookIndex();
        this.router();
    }

    async setCafeBookIndex(): Promise<void> {
        try {
            const result = await cafeBook.getCafeBookIndex();
            if(result == null) await cafeBook.setCafeBookIndex(0);
        }
        catch(err) {
            console.log(err);
        }
    }

    router() {
        this.cafeBookRouter.post('/cafeBooks', auth, createCafeBook);
        this.cafeBookRouter.get('/cafeBooks', auth, listCafeBook);
        this.cafeBookRouter.put('/cafeBooks/:cafeBookIndex', auth, updateCafeBook);
        this.cafeBookRouter.delete('/cafeBooks/:cafeBookIndex', auth, deleteCafeBook);
    }
}

async function createCafeBook(req, res): Promise<void> {
    try {
        const cafeBookIdx: any = await cafeBook.getCafeBookIndex();
        req.body.cafeBookIndex = cafeBookIdx.modelIndex+1;
        const result: any = await cafeBook.createCafeBook(req.body);
        const cafeBookIdxRes: any = await cafeBook.incCafeBookIndex(cafeBookIdx.modelIndex+1)
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createCafeBook 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'createCafeBook 500 : '+err
        });
    }
}

async function listCafeBook(req, res): Promise<void> {
    try {
        const result: any = await cafeBook.listCafeBook();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listCafeBook 200'
        })
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'listCafeBook 500 : ' + err
        });
    }
}

async function updateCafeBook(req, res): Promise<void> {
    const cafeBookIndex: number = req.params.cafeBookIndex;
    try {
        const result: any = await cafeBook.updateCafeBook(cafeBookIndex, req.body);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateCafeBook 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'updateCafeBook 500 : ' + err
        });
    }
}

async function deleteCafeBook(req, res): Promise<void> {
    const cafeBookIndex: number = req.params.cafeBookIndex;
    try {
        const result: any = await cafeBook.deleteCafeBook(cafeBookIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteCafeBook 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'deleteCafeBook 500 : ' + err
        });
    }
}

export const cafeBookRoutes: CafeBookRoute = new CafeBookRoute();