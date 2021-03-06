import { encriptionPasswd } from "../utils/encription.util";


export class UserResource {
    private userName: string;
    private userId: string;
    private userPw: string;
    private major: string;
    private admissionYear: number;

    constructor() {}

    setUserResource(signUpData: any) {
        this.userName = signUpData.userName;
        this.userId = signUpData.userId;
        this.userPw = encriptionPasswd.getHash(signUpData.userPw); // encriptionPasswd
        this.major = signUpData.major;
        this.admissionYear = signUpData.admissionYear;
    }

    updateUserResource(userData: any) {
        this.userName = userData.userName;
        this.userId = userData.userId;
        this.userPw = userData.userPw;
        this.major = userData.major;
        this.admissionYear = userData.admissionYear;
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

