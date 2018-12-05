import * as mongoose from 'mongoose';

const scheduleSchema: any = mongoose.Schema({
    scheduleIndex: { type: Number, required: true, unique: true},
    scheduleYear: { type: Number, required: true },
    scheduleMonth: { type: Number, required: true },
    scheduleDay: { type: Number, required: true },
    scheduleContent: { type: String },
    groupIndex: { type: Number },
    groupName: { type: String },
    posterId: { type: String, required: true }
});

export const scheduleModel: any = mongoose.model("schedules", scheduleSchema);