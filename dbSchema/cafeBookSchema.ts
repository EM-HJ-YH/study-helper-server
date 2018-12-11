import * as mongoose from 'mongoose';

const cafeBookSchema: any = mongoose.Schema({
    cafeBookIndex: { type: Number, required: true, unique: true },
    cafeIndex: { type: Number, required: true },
    cafeBookUserId: { type: String, required: true },
    cafeBookDate: { type: String, required: true },
    cafeBookBeginTime: { type: String, required: true },
    cafeBookEndTime: { type: String, required: true }
});

export const cafeBookModel: any = mongoose.model("cafeBooks", cafeBookSchema)