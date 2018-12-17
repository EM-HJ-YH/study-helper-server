# Study Helper - Server
Web&amp;App Toy Project

## Usage

> git clone https://github.com/EM-HJ-YH/study-helper-server.git <br>
> You need to make some files. 
```
/*** config/awsConfig.json ***/
{
    "accessKeyId": "accessKeyId",
    "secretAccessKey": "secretAccessKey",
    "region": "region"
}
```
```
/*** /utils/jwt.util.ts ***/
export module jwtData {
    export const secret = 'secret key';
    export const algorithm = 'algorithm name';
    export const exp = '24h';
}
```
```
/*** /utils/mongodb.util.ts ***/
export module dbData {
	export const dbName = "<dbUser>";
    export const dbPassword = "<dbpassword>";
    export const mlabURI = "<mongodb URI>";
}
```


> npm install -g typescript <br>
> npm install <br>
> tsc --p tsconfig.json <br>
> sudo node index <br>


### PS
What is ["mongodb URI"](https://docs.mlab.com/connecting/#connect-string)?


#### Website you need
[mlab.com](https://mlab.com/) <br>
[aws.amazon.com](http://aws.amazon.com)
