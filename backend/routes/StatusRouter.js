import express from 'express';
import { getStatus, getStatusById, createStatus, deleteStatus, updateStatus } from '../controllers/Status.js';
import { verifyUser } from '../middleware/Auth.js';

const router = express.Router();

router.get('/status', getStatus);
router.get('/status/:id', getStatusById);
router.post('/status', createStatus);
router.delete('/status/:id', deleteStatus);
router.put('/status/:id', updateStatus);

export default router;