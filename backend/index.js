import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import SequelizeStore from 'connect-session-sequelize';
import fileUpload from 'express-fileupload';

import db from './config/Database.js';

import UserRouter from './routes/UserRoute.js';
import TicketRouter from './routes/TicketRouter.js';
import AuthRouter from './routes/AuthRouter.js';
import StatusRouter from './routes/StatusRouter.js';
import StatusTicketRouter from './routes/StatusTicketRouter.js';
import TypeRouter from './routes/TypeRouter.js';
import Responsible from './routes/Responsible.js';
import Privilege from './routes/PrivilegeRouter.js';
import Import from './routes/ImportRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.listen(5000, ()=>{
    console.log("server running at posrt 5000")
});