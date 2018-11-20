import { userModel } from "../../../dbSchema/userSchema";

export class User {
    constructor() { }

    createUser(userData: any): Promise<any> {
        return new Promise( async (resolve, reject) => {
           await userModel.create(userData, (err, result) => {
               if(err) reject(err);
               else resolve(result);
           })
        });
    }

    listUser(): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await userModel.find({}, (err, results) => {
               if(err) reject(err);
               else resolve(results);
           })
        });
    }

    getUser(userId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await userModel.findOne({userId: userId}, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            })
        });
    }

    updateUser(userId: string, userData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await userModel.findOneAndUpdate({userId: userId}, userData, {new: true}, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            })
        });
    }

    deleteUser(userId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await  userModel.remove({userId: userId}, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            })
        });
    }

}

export const user: User = new User();