import * as jwt from 'jsonwebtoken';

import { userModel } from "../../../dbSchema/userSchema";
import { encriptionPasswd } from "../../../utils/encription.util";
import { jwtData } from "../../../utils/jwt.util";

export class SignIn {
    constructor() { }

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
}

export const signIn: SignIn = new SignIn();