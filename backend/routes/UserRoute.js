import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    findUsers,
    createUserByAdmin,
    getUsers2,
    uploadFoto,
    updatePassword
} from '../controllers/Users.js';
import { verifyUser } from '../middleware/Auth.js';

const route = express.Router();

route.get('/users/:limit&:page', getUsers);
route.get('/users2/:code&:limit&:page', getUsers2);
route.get('/findUsers/:name',  findUsers);
route.get('/users/:id', getUserById);
route.post('/users', createUser);
route.post('/usersByAdmin', createUserByAdmin);
route.put('/users/:id', verifyUser, updateUser);
route.delete('/users/:id', verifyUser, deleteUser);
route.put('/images/:id', uploadFoto);
route.put('/updatePassword/:id', updatePassword);

export default route;