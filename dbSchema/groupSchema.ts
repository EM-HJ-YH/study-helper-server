import * as mongoose from 'mongoose';

const groupSchema: any = mongoose.Schema({
    groupIndex: { type: Number, requited: true, unique: true },
    groupMasterId: { type: String, required: true },
    groupName: { type: String, required: true },
    members: { type: Array }
});

export const groupModel: any = mongoose.model("groups", groupSchema);