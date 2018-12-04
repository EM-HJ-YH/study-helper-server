import * as express from 'express';
import { admin } from "../model/admin.model";

export class AdminRoutes {
    public adminRouter: express.Router = express.Router();

    constructor() {
        this.router();
    }

    router() {
        this.adminRouter.post('/admins', createAdmin);
        this.adminRouter.get('/admins', listAdmin);
        this.adminRouter.put('/admins/:adminId', updateAdmin);
        this.adminRouter.delete('/admins/:adminId', deleteAdmin);
    }
}

async function createAdmin(req, res): Promise<void> {
    try {
        const result: any = await admin.createAdmin(req.body);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createAdmin 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'createAmdin 500 ' + err
        });
    }
}

async function listAdmin(req, res): Promise<void> {
    try {
        const result: any = await admin.listAdmin();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listAdmin 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'listAdmin 500 ' + err
        });
    }
}

async function updateAdmin(req, res): Promise<void> {
    const adminId: string = req.params.adminId;
    try {
        const result: any = await admin.updateAdmin(adminId, req.body);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateAdmin 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'updateAdmin 500 ' + err
        });
    }
}

async function deleteAdmin(req, res): Promise<void> {
    const adminId: string = req.params.adminId;
    try {
        const result: any = await admin.deleteAdmin(adminId);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteAdmin 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'deleteAdmin 500 ' + err
        });
    }
}

export const adminRoutes: AdminRoutes = new AdminRoutes();