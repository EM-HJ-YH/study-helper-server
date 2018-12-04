import * as jwt from 'jsonwebtoken';

import { userModel } from "../../../dbSchema/userSchema";
import { encriptionPasswd } from "../../../utils/encription.util";
import { jwtData } from "../../../utils/jwt.util";
import { indexModel } from "../../../dbSchema/indexSchema";
import { adminModel } from "../../../dbSchema/adminSchema";

export class SignIn {
    constructor() { }

    setUserIndex(userIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await indexModel.create({model: 'user', modelIndex: userIndex}, (err, result) => {
               if(err) reject("signIn.model.setUserIndex() error");
               else resolve(result);
            });
        });
    }

    getUserIndex(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await indexModel.findOne({model: 'user'}, (err, result) => {
                if(err) reject("getUserIndex() error");
                else resolve(result);
            });
        });
    }

    incUserIndex(userIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await indexModel.findOneAndUpdate({model: 'user'}, {model:'user', modelIndex: userIndex}, {new: true}, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }

    signInUser(userData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await userModel.findOne({userId: userData.userId}, (err, result) => {
                if(err) reject('server error');
                else {
                    if(result == null) reject('not Found userId');
                    else {
                        const userPw: any = encriptionPasswd.getHash(userData.userPw);
                        if(result.userPw !== userPw) reject('password Incorrect');
                        else {
                            delete result.userPw;
                            jwt.sign(
                                {
                                    tokenUserName: result.userName,
                                    tokenUserId: result.userId,
                                    tokenMajor: result.major,
                                    tokenAdmissionYear: result.admissionYear,
                                    tokenAdmin: false
                                },
                                jwtData.secret,
                                {
                                    issuer: 'Study Helper',
                                    algorithm: jwtData.algorithm,
                                    expiresIn: jwtData.exp
                                }, (err, token) => {
                                    if(err) reject('jwt incorrect');
                                    else {
                                        const ret = {
                                            userName: result.userName,
                                            userId: result.userId,
                                            major: result.major,
                                            admissionYear: result.admissionYear,
                                            token: token
                                        };
                                        resolve(ret);
                                    }
                                }
                            )
                        }
                    }
                }
            })
        });
    }

    signInAdmin(adminData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await adminModel.findOne({adminId: adminData.adminId}, (err, result) => {
                if(err) reject('server error');
                else {
                    if(result == null) reject('not Found adminId');
                    else {
                        if(result.adminPw !== adminData.adminPw) reject('password Incorrect');
                        else {
                            delete result.adminPw;
                            jwt.sign(
                                {
                                    tokenAdminId: result.adminId,
                                    tokenAdmin: true
                                },
                                jwtData.secret,
                                {
                                    issuer: 'Study Helper',
                                    algorithm: jwtData.algorithm,
                                    expiresIn: jwtData.exp
                                }, (err, token) => {
                                    if(err) reject('jwt incorrect');
                                    else {
                                        const ret = {
                                            adminId: result.adminId,
                                            token: token,
                                            isAdmin: true
                                        };
                                        resolve(ret);
                                    }
                                }
                            )
                        }
                    }
                }
            })
        });
    }

}

export const signIn: SignIn = new SignIn();