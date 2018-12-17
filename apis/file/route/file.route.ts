import * as express from 'express';

import { file } from "../model/file.model";
import { auth } from "../../../middlewares/auth.middlewares";
import { s3Util } from "../../../utils/s3.util";

const upload = s3Util.upload.single('file');

export class FileRoute {
    public fileRouter: express.Router = express.Router();

    constructor() {
        const idx = this.setFileIndex();
        this.router();
    }
    async setFileIndex(): Promise<void> {
        try {
            const result = await file.getFileIndex();
            if(result == null) await file.setFileIndex(0);
        }
        catch (err) {
            console.log(err);
        }
    }

    router() {
        this.fileRouter.post('/file/upload', auth, uploadFile);
        this.fileRouter.get('/file', auth, listFile);
        this.fileRouter.put('/file/:fileIndex', auth, updateFile);
        this.fileRouter.delete('/file/:fileIndex', auth, deleteFile);
    }
}

async function uploadFile(req, res): Promise<void> {
    await upload(req, res, async (err) => {
        if(err) {
            res.send({
                success: false,
                statusCode: 403,
                message: 'uploadFile: 500 >> ' + err
            });
        }
        else {
            try {
                const fileIndex: any = await file.getFileIndex();
                const fileIdxRes: any = await file.incFileIndex(fileIndex.modelIndex + 1);
                const fileData = {
                    fileIndex: fileIndex.modelIndex + 1,
                    groupBoardIndex: 0,
                    originalName: req.file.originalname,
                    key: req.file.key,
                    location: req.file.location
                };

                const result: any = await file.createFile(fileData);

                res.send({
                    success: true,
                    statusCode: 200,
                    result: result,
                    message: 'uploadFile: 200'
                });
            }
            catch (err) {
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'uploadFile: 500 : ' + err
                })
            }

        }
    });
}

async function listFile(req, res): Promise<void> {
    try {
        const result: any = await file.listFile();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listFile 200'
        })
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'listFile 500 : ' + err
        });
    }
}

async function updateFile(req, res): Promise<void> {
    const fileIndex: number = req.params.fileIndex;
    try {
        const result: any = await file.updateFile(fileIndex, req.body);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateFile 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'updateFile 500 : ' + err
        });
    }
}

async function deleteFile(req, res): Promise<void> {
    const fileIndex: number = req.params.fileIndex;
    try {
        const result: any = await file.deleteFileGroupBoardIndexByFileIndex(fileIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteFile 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'deleteFile 500 ' + err
        });
    }
}

export const fileRoutes: FileRoute = new FileRoute();