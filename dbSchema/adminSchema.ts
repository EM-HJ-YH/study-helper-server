import * as mongoose from 'mongoose';

const adminSchema: any = mongoose.Schema({
   adminId: {type: String, required: true, uniqu: true},
   adminPw: {type: String}
});

export const adminModel: any = mongoose.model("admins", adminSchema);