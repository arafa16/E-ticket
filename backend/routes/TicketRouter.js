import express from 'express';
import {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    updateStatusTicket,
    updateResponseTicket,
    getNewTicketByUser,
    getClearTicketByUser,
    getClearTicketTable,
    getNewTicketTable
} from '../controllers/Tickets.js';
import { verifyUser } from '../middleware/Auth.js';

const route = express.Router();

route.get('/tickets', verifyUser, getTickets);

// get clear ticket
route.get('/clearTickets/:limit&:page', getClearTicketTable);
route.get('/clearTicketsByUser/:id&:limit&:page', getClearTicketByUser);

//get new ticket
route.get('/newTickets/:limit&:page', getNewTicketTable);
route.get('/newTicketsByUser/:id&:limit&:page', getNewTicketByUser);

route.get('/tickets/:id', getTicketById);
route.post('/tickets',verifyUser, createTicket);
route.put('/tickets/:id', updateTicket);
route.put('/statusTickets/:id', updateStatusTicket);
route.put('/responseTickets/:id', updateResponseTicket);
route.delete('/tickets', deleteTicket);

export default route;