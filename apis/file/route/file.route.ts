import * as express from 'express';

import { auth } from "../../../middlewares/auth.middlewares";
import { s3Util } from "../../../utils/s3.util";

const upload = s3Util.upload.single('file');

export class FileRoute {
    public fileRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    router() {
        this.fileRouter.post('/file/upload', auth, uploadFile);
    }
}

async function uploadFile(req, res): Promise<void> {
    await upload(req, res, async (err) => {
        if(err) {
            res.send({
                success: false,
                statusCode: 403,
                message: 'uploadFile: 500 : ' + err
            });
        }
        else {
            console.log(req.file);
            res.send({
                success: true,
                statusCode: 200,
                message: 'uploadFile: 200'
            });
        }
    });
}

export const fileRoutes: FileRoute = new FileRoute();