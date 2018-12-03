import { groupModel } from "../../../dbSchema/groupSchema";
import { indexModel } from "../../../dbSchema/indexSchema";

export class Group {
    constructor() {}

    setGroupIndex(groupIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await indexModel.create({model: 'group', modelIndex: groupIndex}, (err, result) => {
                if(err) reject("group.model.setGroupIndex() error");
                else resolve(result);
            });
        });
    }

    getGroupIndex(): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.findOne({model: 'group'}, (err, result) => {
               if(err) reject('getGroupIndex() error');
               else resolve(result);
           })
        });
    }

    incGroupIndex(groupIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await indexModel.findOneAndUpdate({model: 'group'}, {model: 'group', modelIndex: groupIndex}, {new: true}, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            })
        })
    }

    createGroup(groupData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await groupModel.create(groupData, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            })
        });
    }

    listGroup(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await groupModel.find({}, (err, results) => {
                if(err) reject(err);
                else resolve(results);
            });
        });
    }

    listMyGroup(userId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await groupModel.find({members: userId}, (err, results) => {
              if(err) reject(err);
              else resolve(results);
           });
        });
    }

    getGroup(groupIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await groupModel.findOne({groupIndex: groupIndex}, (err, result) => {
               if(err) reject(err);
               else resolve(result);
           });
        });
    }

    removeMember(groupIndex: number, memberId: string, groupData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            console.log(">> " + groupData);
           if(memberId == groupData.groupMasterId) reject('Group master cannot be removed');
           else {
               let members: any = groupData.members;
               if(!members.includes(memberId)) reject(memberId + ' does not exist');
               else {
                   members.pop(memberId);
                   await groupModel.findOneAndUpdate({groupIndex: groupIndex}, {$set: {members: members}}, {new: true}, (err, result) => {
                      if(err) reject(err);
                      else resolve(result);
                   });
               }
           }
        });
    }

    updateGroup(groupIndex: number, groupData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await groupModel.findOneAndUpdate({groupIndex: groupIndex}, groupData, {new: true}, (err, result) => {
               if(err) reject(err);
               else resolve(result);
           });
        });
    }

    deleteGroup(groupIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await groupModel.remove({groupIndex: groupIndex}, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }
}

export const group: Group = new Group();