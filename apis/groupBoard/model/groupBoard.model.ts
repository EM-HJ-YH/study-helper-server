import { groupBoardModel } from "../../../dbSchema/groupBoardSchema";
import { indexModel } from "../../../dbSchema/indexSchema";

export class GroupBoard {
    constructor() {}

    setGroupBoardIndex(groupBoardIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.create({model: 'groupBoard', modelIndex: groupBoardIndex}, (err, result) => {
               if(err) reject("groupBoard.model.setBoardIndex() error");
               else resolve(result);
           });
        });
    }

    getGroupBoardIndex(): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.findOne({model: 'groupBoard'}, (err, result) => {
               if(err) reject(err);
               else resolve(result);
           });
        });
    }

    incGroupBoardIndex(groupBoardIndex: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
           await indexModel.findOneAndUpdate({model: 'groupBoard'}, {model: 'groupBoard', modelIndex: groupBoardIndex}, {new: true}, (err, result) => {
               if(err) reject(err);
               else resolve(result);
           });
        });
    }

    createGroupBoard(groupBoardData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await groupBoardModel.create(groupBoardData, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }

    listGroupBoard(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await groupBoardModel.find({}, (err, results) => {
                if(err) reject(err);
                else resolve(results);
            });
        });
    }

    getGroupBoardByIndex(groupBoardIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await groupBoardModel.findOne({groupBoardIndex: groupBoardIndex}, (err, result) => {
               if(err) reject(err);
               else resolve(result);
            });
        });
    }

    getGroupBoardByGroup(groupIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await groupBoardModel.find({groupIndex: groupIndex}, (err, results) => {
              if(err) reject(err);
              else resolve(results.sort((a, b) => {
                  return b.groupBoardIndex - a.groupBoardIndex;
              }));
           });
        });
    }

    updateGroupBoard(groupBoardIndex: number, groupBoardData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await groupBoardModel.findOneAndUpdate({groupBoardIndex: groupBoardIndex}, groupBoardData, {new: true}, (err, result) => {
               if(err) reject(err);
               else resolve(result);
            });
        });
    }

    deleteGroupBoard(groupBoardIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await groupBoardModel.remove({groupBoardIndex: groupBoardIndex}, (err, result) => {
               if(err) reject(err);
               else resolve(result);
           });
        });
    }
}

export const groupBoard: GroupBoard = new GroupBoard();