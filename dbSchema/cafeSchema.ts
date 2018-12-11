import * as mongoose from 'mongoose';

const cafeSchema: any = mongoose.Schema({
    cafeIndex: { type: Number, required: true, unique: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    cafeName: { type: String, required: true },
    cafePhone: { type: String }
});

export const cafeModel: any = mongoose.model("cafes", cafeSchema);