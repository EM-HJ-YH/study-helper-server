import { scheduleModel } from "../../../dbSchema/scheduleSchema";
import { indexModel } from "../../../dbSchema/indexSchema";

export class Schedule {
    constructor() {}

    setScheduleIndex(scheduleIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await indexModel.create({model: 'schedule', modelIndex: scheduleIndex}, (err, result) => {
               if(err) reject('schedule.model.setScheduleIndex() error');
               else resolve(result);
            });
        });
    }

    getScheduleIndex(): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.findOne({model: 'schedule'}, (err, result) => {
              if(err) reject('getScheduleIndex() error');
              else resolve(result);
           });
        });
    }

    incScheduleIndex(scheduleIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.findOneAndUpdate({model: 'schedule'}, {model: 'schedule', modelIndex: scheduleIndex}, {new: true}, (err, result) => {
               if(err) reject(err);
               else resolve(result);
           });
        });
    }

    createSchedule(scheduleData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await scheduleModel.create(scheduleData, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

    listSchedule(): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await scheduleModel.find({}, (err, results) => {
              if(err) reject(err);
              else resolve(results);
           });
        });
    }

    getMyScheduleByYearMonth(Year: string, Month: string, myGroups: string[]): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const check: any = {
                scheduleYear: Year,
                scheduleMonth: Month,
                groupName: {$in:myGroups}
            };
            await scheduleModel.find(check, (err, results) => {
                if(err) reject(err);
                else resolve(results.sort((a, b) => {
                    return b.scheduleIndex - a.scheduleIndex;
                }));
            });
        });
    }

    updateSchedule(scheduleIndex: number, scheduleData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await scheduleModel.findOneAndUpdate({scheduleIndex: scheduleIndex}, scheduleData, {new: true}, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

    deleteSchedule(scheduleIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await scheduleModel.remove({scheduleIndex: scheduleIndex}, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

}

export const schedule: Schedule = new Schedule();