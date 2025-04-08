import express from 'express';
import {
  getReservedTables,
  createReservation
} from '../controllers/reservationControllers.js';

const router = express.Router();

// Route to get reserved tables for a specific date and time
router.get('/getTable', getReservedTables);

// Route to create a new reservation
router.post('/addRes', createReservation);

export default router;
