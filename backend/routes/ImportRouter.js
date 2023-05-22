import express from 'express';
import { ImportUser } from '../controllers/Import.js';

const route = express.Router();

route.post('/xlsx', ImportUser);

export default route;