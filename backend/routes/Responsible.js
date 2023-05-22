import express from 'express';
import { createResponsible, deleteResponsible, getResponsible, updateResponsible } from '../controllers/Responsible.js';

const router = express.Router();

router.get('/responsible', getResponsible);
router.post('/responsible', createResponsible);
router.delete('/responsible/:id', deleteResponsible);
router.put('/responsible/:id', updateResponsible);

export default router;