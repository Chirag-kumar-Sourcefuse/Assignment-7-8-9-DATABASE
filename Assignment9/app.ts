import express from 'express';
import * as http from 'http';
// import * as winston from 'winston';
// import * as expressWinston from 'express-winston';
import cors from 'cors'
//import { CommonRoutesConfig } from './common.route.config';
// import {UsersRoutes} from './user';

import debug from 'debug';
import router from './routes-users-db';
// const router=express.Router();
// const path=require('path');

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
//const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json())
app.use(cors());

app.use(express.urlencoded());

app.use(express.static('public'));
app.use('/routes-users',router);



app.get("/", (req, res) => {
    res.sendFile(__dirname+"/views/main.html");
  });
//routes.push(new UsersRoutes(app));  
const runningMessage = `Server running at http://localhost:${port}`;
server.listen(port, () => {
    // routes.forEach((route: CommonRoutesConfig) => {
    //     debugLog(`Routes configured for ${route.getName()}`);
    // });
    console.log(runningMessage);
});