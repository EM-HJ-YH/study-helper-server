import * as mongoose from 'mongoose';

const scheduleSchema: any = mongoose.Schema({
    scheduleIndex: { type: Number, required: true, unique: true},
    scheduleYear: { type: String, required: true },
    scheduleMonth: { type: String, required: true },
    scheduleDay: { type: String, required: true },
    scheduleContent: { type: String },
    groupIndex: { type: Number },
    groupName: { type: String },
    posterId: { type: String, required: true }
});

export const scheduleModel: any = mongoose.model("schedules", scheduleSchema);