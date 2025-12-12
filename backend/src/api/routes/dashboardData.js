import express from 'express';
import {
  getStats,
  getActions,
  getBookings,
  getOrders,
  getProjects,
  getAppointments,
  createStat,
  createAction,
  createBooking
} from '../controllers/dashboardController.js';

const router = express.Router();

// GET endpoints
router.get('/stats', getStats);
router.get('/actions', getActions);
router.get('/bookings', getBookings);
router.get('/orders', getOrders);
router.get('/projects', getProjects);
router.get('/appointments', getAppointments);

// POST endpoints
router.post('/stats', createStat);
router.post('/actions', createAction);
router.post('/bookings', createBooking);

export default router;
