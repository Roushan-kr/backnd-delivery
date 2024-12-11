import Booking from '../models/Booking.js';
import asyncHandler from "../utils/asyncHandler.js";

// Create a new booking
const createBooking = asyncHandler(async (req, res) => {
  const { name, email, phone, date, time, people } = req.body;

  if (!name || !email || !phone || !date || !time || !people) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }

  const booking = new Booking({ name, email, phone, date, time, people });
  await booking.save();
  res.status(201).json({ message: "Booking created successfully", booking, success: true });
});

// Get booking by ID
const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found", success: false });
  }
  res.status(200).json({ booking, success: true });
});

export { createBooking, getBookingById };
