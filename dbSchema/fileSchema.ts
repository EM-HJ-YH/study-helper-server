import * as mongoose from 'mongoose';

const fileSchema: any = mongoose.Schema({
    fileIndex: { type: Number, required: true, unique: true },
    groupBoardIndex: { type: Number },
    originalName: { type: String, required: true },
    key: { type: String, required: true },
    location: { type: String, required:true, unique: true }
});

export const fileModel: any = mongoose.model("files", fileSchema);