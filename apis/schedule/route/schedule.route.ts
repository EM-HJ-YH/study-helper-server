import * as express from 'express';
import { schedule } from "../model/schedule.model";
import { group } from "../../group/model/group.model";
import { auth } from "../../../middlewares/auth.middlewares";

export class ScheduleRoute {
    public scheduleRouter: express.Router = express.Router();

    constructor() {
        const inx = this.setScheduleIndex();
        this.router();
    }

    async setScheduleIndex(): Promise<void> {
        try {
            const result = await schedule.getScheduleIndex();
            if(result == null) await schedule.setScheduleIndex(0);
        }
        catch (err) {
            console.log(err);
        }
    }

    router() {
        this.scheduleRouter.post('/schedules', auth, createSchedule);
        this.scheduleRouter.get('/schedules', auth, listSchedule);
        this.scheduleRouter.get('/schedules/:Year/:Month/:userId', auth, getMyScheduleByYearMonth);
        this.scheduleRouter.put('/schedules/:scheduleIndex', auth, updateSchedule);
        this.scheduleRouter.delete('/schedules/:scheduleIndex', auth, deleteSchedule);
    }
}

async function createSchedule(req, res): Promise<void> {
    try {
        const scheduleIdx: any = await schedule.getScheduleIndex();
        req.body.scheduleIndex = scheduleIdx.modelIndex+1;
        const result: any = await schedule.createSchedule(req.body);
        const scheduleIdxRes: any = await schedule.incScheduleIndex(scheduleIdx.modelIndex+1);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'createSchedule 200'
        });
    } catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'createSchedule 500 : '+err
        });
    }
}

async function listSchedule(req, res): Promise<void> {
    try {
        const result: any = await schedule.listSchedule();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listSchedule 200'
        })
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'listSchedule 500'
        });
    }
}

async function getMyScheduleByYearMonth(req, res): Promise<void> {
    const Year: string = req.params.Year;
    const Month: string = req.params.Month;
    const userId: string = req.params.userId;
    try {
        const myGroups: any = await group.listMyGroup(userId);
        let myGroupNames: string[] = [];
        for(let i=0; i<myGroups.length; i++)
            myGroupNames.push(myGroups[i].groupName);
        const result: any = await schedule.getMyScheduleByYearMonth(Year, Month, myGroupNames);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'getMyScheduleByYearMonth 200'
        })
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'getMyScheduleByYearMonth 500'
        });
    }
}

async function updateSchedule(req, res): Promise<void> {
    const scheduleIndex: number = req.params.scheduleIndex;
    try {
        const result: any = await schedule.updateSchedule(scheduleIndex, req.body);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'updateSchedule 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'updateSchedule 500'
        });
    }
}

async function deleteSchedule(req, res): Promise<void> {
    const scheduleIndex: number = req.params.scheduleIndex;
    try {
        const result: any = await schedule.deleteSchedule(scheduleIndex);
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'deleteSchedule 200'
        });
    }
    catch (err) {
        res.send({
            success: false,
            statusCode: 500,
            message: 'deleteSchedule 500'
        });
    }
}

export const scheduleRoutes: ScheduleRoute = new ScheduleRoute();