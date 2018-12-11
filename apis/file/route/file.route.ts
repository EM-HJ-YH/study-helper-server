import * as express from 'express';

import { auth } from "../../../middlewares/auth.middlewares";
//import { s3Util } from "../../../utils/s3.util";

import * as aws from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import { awsData } from "../../../utils/aws.util";

//aws.config.loadFromPath('/Users/ychooni/dev/webApp/studyHelper/utils/config/awsconfig.json');
let s3 = new aws.S3();

let upload = multer({
   storage: multerS3({
       s3: s3,
       bucket: awsData.bucket,
       key: function (req, file, cb) {
           let extension = path.extname(file.originalname);
           cb(null, Date.now().toString() + extension)
       },
       acl: awsData.acl
   })
});

export class FileRoute {
    public fileRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    router() {
        //this.fileRouter.post('/file/upload', uploadFile);
        this.fileRouter.post('/file/upload', upload.single('file'), uploadFile);

    }
}

async function uploadFile(req, res, next): Promise<void> {
    console.log(">> "+req.file);
    console.log(">>> "+req.files);
    res.send("Hello");
}

/*
async function uploadFile(req, res): Promise<void> {
    const upload = s3Util.upload.array('file', 3);
    upload(req, res, (err) => {
        if(err) console.log(err);
        else {
            console.log(req);
            res.send(req);
        }
    });
}
*/
export const fileRoutes: FileRoute = new FileRoute();