import * as jwt from 'jsonwebtoken';
import { jwtData } from "../utils/jwt.util";

export async function auth(req, res, next) {
    try {
        const result: any = await verifyToken(req, res, next);
    } catch (err) {
        res.send({
            success: false,
            statusCode: 403,
            message: 'Token Error 403 : ' + err
        });
    }
}

function verifyToken(req, res, next): Promise<any> {
    return new Promise(async (resolve, reject) => {
        let token = req.headers['x-access-token'];
        if(!token) reject('Token is required!');
        else {
            await jwt.verify(token, jwtData.secret, (err, decoded) => {
                if(err) reject("Fail to verify token >> "+err);
                else {
                    req.decoded = decoded;
                    resolve(next());
                }
            });
        }
    });
}