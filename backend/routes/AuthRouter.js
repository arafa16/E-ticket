import express from 'express';
import {Login, Me, Logout, ResetPassword, getReset, postReset} from '../controllers/Auth.js'

const route = express.Router();

route.get('/me', Me);
route.post('/login', Login);
route.delete('/logout', Logout);
route.post('/reset', ResetPassword);
route.get('/reset/:id&:token', getReset);
route.post('/resetPassword', postReset);

export default route;