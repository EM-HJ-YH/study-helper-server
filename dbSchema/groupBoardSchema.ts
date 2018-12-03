import * as mongoose from 'mongoose';

const groupBoardSchema: any = mongoose.Schema({
    groupBoardIndex: { type: Number, required: true, unique: true },
    groupIndex: { type: Number, required: true },
    groupName: { type: String, required: true },
    groupBoardTitle: { type: String, required: true },
    groupBoardContent: { type: String },
    groupBoardPosterId: { type: String, required: true },
    groupBoardDate: { type: String }
});

export const groupBoardModel: any = mongoose.model('groupBoard', groupBoardSchema);