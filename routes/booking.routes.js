import express from 'express';
import {createBooking, getBookingById} from '../controllers/bookingController.js'
const router = express.Router();

router.post('/login',)

router.post('/', createBooking);
router.get("/:id", getBookingById);

export default router;