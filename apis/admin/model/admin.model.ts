import { adminModel } from "../../../dbSchema/adminSchema";

export class Admin {
    constructor() {}

    createAdmin(adminData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await adminModel.create(adminData, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

    listAdmin(): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await adminModel.find({}, (err, results) => {
              if(err) reject(err);
              else resolve(results);
           });
        });
    }

    updateAdmin(adminId: string, adminData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await adminModel.findOneAndUpdate({adminId: adminId}, adminData, {new: true}, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

    deleteAdmin(adminId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await adminModel.remove({adminId: adminId}, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }
}

export const admin: Admin = new Admin();