import express from 'express';
import { createPrivilege, getPrivilege, getPrivilege2, updatePrivilege } from '../controllers/Privilege.js';

const router = express.Router();

router.get('/privilege', getPrivilege);
router.get('/privilege/:id', getPrivilege2);
router.post('/privilege', createPrivilege);
router.post('/privilege/:id', updatePrivilege);

export default router;