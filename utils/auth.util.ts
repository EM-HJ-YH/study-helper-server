import * as jwt from 'jsonwebtoken';
import { jwtData } from "./jwt.util";

export module auth {
    let loggedIn = (req, res, next): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            let token = req.headers['x-access-token'];
            if(!token) reject('token is required!');
            else {
                await jwt.verify(token, jwtData.secret, (err, decoded) => {
                    if(err) reject(err);
                    else {
                        req.decoded = decoded;
                        resolve(next());
                    }
                });
            }
        });
    }
}