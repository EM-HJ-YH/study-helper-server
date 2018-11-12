import { encriptionPasswd } from "../utils/encription.util";


export class UserResource {
    private userName;
    private userId;
    private userPw;
    private major;
    private admissionYear;

    constructor(signUpData: any) {
        this.userName = signUpData.userName;
        this.userId = signUpData.userId;
        this.userPw = encriptionPasswd.getHash(this.userPw); // encriptionPasswd
        this.major = signUpData.major;
        this.admissionYear = signUpData.admissionYear;
    }

    getUserResource(): any {
        let userResource = {
            userName: this.userName,
            userId: this.userId,
            userPw: this.userPw,
            major: this.major,
            admissionYear: this.admissionYear
        };
        return userResource;
    }
}

