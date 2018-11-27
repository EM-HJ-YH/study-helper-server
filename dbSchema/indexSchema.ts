import * as mongoose from 'mongoose';

const indexSchema: any = mongoose.Schema({
    model: { type: String, required: true },
    modelIndex: { type: Number }
});

export const indexModel: any = mongoose.model("index", indexSchema);

