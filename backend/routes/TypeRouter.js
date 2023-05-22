import express from 'express';
import { createType, deleteType, getTypeById, getTypes, updateType } from '../controllers/Type.js';

const router = express.Router();

router.get('/types', getTypes);
router.get('/types/:id', getTypeById);
router.post('/types', createType);
router.put('/types/:id', updateType);
router.delete('/types/:id', deleteType);

export default router;