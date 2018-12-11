import { cafeBookModel } from "../../../dbSchema/cafeBookSchema";
import { indexModel } from "../../../dbSchema/indexSchema";

export class CafeBook {
    constructor() {}

    setCafeBookIndex(cafeBookIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.create({model: 'cafeBook', modelIndex: cafeBookIndex}, (err, result) => {
              if(err) reject('cafeBook.model.setCafeBookIndex() error');
              else resolve(result);
           });
        });
    }

    getCafeBookIndex(): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.findOne({model: 'cafeBook'}, (err, result) => {
              if(err) reject('getCafeBookIndex() error');
              else resolve(result);
           });
        });
    }

    incCafeBookIndex(cafeBookIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.findOneAndUpdate({model: 'cafeBook'}, {model: 'cafeBook', modelIndex: cafeBookIndex}, {new: true}, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

    createCafeBook(cafeBookData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await cafeBookModel.create(cafeBookData, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

    listCafeBook(): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await cafeBookModel.find({}, (err, results) => {
              if(err) reject(err);
              else resolve(results);
           });
        });
    }

    updateCafeBook(cafeBookIndex: number, cafeBookData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await cafeBookModel.findOneAndUpdate({cafeBookIndex: cafeBookIndex}, cafeBookData, {new: true}, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

    deleteCafeBook(cafeBookIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await cafeBookModel.remove({cafeBookIndex: cafeBookIndex}, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }
}

export const cafeBook: CafeBook = new CafeBook();