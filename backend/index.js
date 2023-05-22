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

//cara menyimpan session di database
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    //menyimpan session store ke session
    store: store,
    cookie:{
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: process.env.LINK
}))

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

//router
app.use(UserRouter);
app.use(TicketRouter);
app.use(AuthRouter);
app.use(StatusRouter);
app.use(StatusTicketRouter);
app.use(TypeRouter);
app.use(Responsible);
app.use(Privilege);
app.use(Import);

// store.sync();

app.listen(process.env.PORT, ()=> {
    console.log("server running..")
})