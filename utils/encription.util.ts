import * as pbkdf2 from 'pbkdf2';

/*** salt 값 ***/
const salt: string = 'studyHelper';

/*** 암호화 횟수 ***/
const iterations: number = 5;

/*** 암호화 길이 ***/
const keyLength: number = 16;

/*** 암호화 방식 ***/
const digest: string = 'sha512';

class EncriptionPasswd {
    getHash(passwd): string {
        let derivedKey = pbkdf2.pbkdf2Sync(passwd, salt, iterations, keyLength, digest);
        return derivedKey.toString('hex');
    }
}

export const encriptionPasswd: EncriptionPasswd = new EncriptionPasswd();
