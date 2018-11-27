import * as express from 'express';
import { Server } from './server';

import * as mongoose from 'mongoose';
import { dbData } from './utils/mongodb.util';


/*** DB Setting ***/
const dbName = dbData.dbName;
const dbPasswd = dbData.dbPassword;
const mlabURI = dbData.mlabURI;
const dbURI = `mongodb://${dbName}:${dbPasswd}@${mlabURI}`;
mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('findOneAndUpdate', true);
mongoose.set('deleteOne', true);
mongoose.set('useFindAndModify', false);


const db = mongoose.connection;
db.once("open", () => {
    console.log("DB connected");
});

db.on("error", (err) => {
    console.log("DB ERROR : ", err);
});


/*** Port Setting ***/
const port: number = 80;
const app: express.Application = new Server().app;

app.listen(port, () => {
    console.log('Study Helper Server Listening on port ' + port);
});




