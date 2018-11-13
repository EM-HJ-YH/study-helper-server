import * as mongoose from 'mongoose';

const userSchema: any = mongoose.Schema({
    userName: {type: String, required: true},
    userId: {type: String, required: true, unique: true},
    userPw: {type: String, required: true},
    major: {type: String},
    admissionYear: {type: Number}
});

export const userModel: any = mongoose.model("users", userSchema);
