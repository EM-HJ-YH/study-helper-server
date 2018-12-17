import { fileModel } from "../../../dbSchema/fileSchema";
import { indexModel } from "../../../dbSchema/indexSchema";

export class File {
    constructor() {}

    setFileIndex(fileIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.create({model: 'file', modelIndex: fileIndex}, (err, result) => {
              if(err) reject('file.model.setFileIndex() error');
              else resolve(result);
           });
        });
    }

    getFileIndex(): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.findOne({model: 'file'}, (err, result) => {
               if(err) reject('getFileIndex() error');
               else resolve(result);
           });
        });
    }

    incFileIndex(fileIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.findOneAndUpdate({model: 'file'}, {model: 'file', modelIndex: fileIndex}, {new: true}, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

    createFile(fileData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await fileModel.create(fileData, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

    listFile(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await fileModel.find({}, (err, results) => {
                if(err) reject(err);
                else resolve(results);
            });
        })
    }

    updateFile(fileIndex: number, fileData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await fileModel.findOneAndUpdate({fileIndex: fileIndex}, fileData, {new: true}, (err, result) => {
               if(err) reject(err);
               else resolve(result);
            });
        });
    }

    deleteFile(fileIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await fileModel.remove({fileIndex: fileIndex}, (err, result) => {
               if(err) reject(err);
               else resolve(result);
           });
        });
    }

}

export const file: File = new File();