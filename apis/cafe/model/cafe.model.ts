import { cafeModel } from "../../../dbSchema/cafeSchema";
import { indexModel } from "../../../dbSchema/indexSchema";

export class Cafe {
    constructor() {}

    setCafeIndex(cafeIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.create({model: 'cafe', modelIndex: cafeIndex}, (err, result) => {
              if(err) reject('cafe.model.setCafeIndex() error');
              else resolve(result);
           });
        });
    }

    getCafeIndex(): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.findOne({model: 'cafe'},(err, result) => {
              if(err) reject('getCafeIndex() error');
              else resolve(result);
           });
        });
    }

    incCafeIndex(cafeIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await indexModel.findOneAndUpdate({model: 'cafe'}, {model: 'cafe', modelIndex: cafeIndex}, {new: true}, (err, result) => {
               if(err) reject(err);
               else resolve(result);
           });
        });
    }

    createCafe(cafeData: any): Promise<any> {
        return new Promise(async(resolve, reject) => {
           await cafeModel.create(cafeData, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

    listCafe(): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await cafeModel.find({}, (err, results) => {
              if(err) reject(err);
              else resolve(results);
           });
        });
    }

    updateCafe(cafeIndex: number, cafeData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await cafeModel.findOneAndUpdate({cafeIndex: cafeIndex}, cafeData, {new: true}, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

    deleteCafe(cafeIndex: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
           await cafeModel.remove({cafeIndex: cafeIndex}, (err, result) => {
              if(err) reject(err);
              else resolve(result);
           });
        });
    }

}

export const cafe: Cafe = new Cafe();