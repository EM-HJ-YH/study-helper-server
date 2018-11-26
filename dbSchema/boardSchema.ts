import * as mongoose from 'mongoose';

const boardSchema: any = mongoose.Schema({
    boardIndex: { type: Number, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    boardTitle: { type: String, required: true },
    boardContent: { type: String },
    boardDate: { type: Date },
    memberCount: { type: Number },
    members: { type: Array },
    isRecruiting: { type: Boolean }
});

export const boardModel: any = mongoose.model("boards", boardSchema);
