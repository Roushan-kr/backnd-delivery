import Booking from '../models/Booking.js'

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { name, email, phone, date, time, people } = await req.body;
    // console
    if (!name || !email || !phone || !date || !time || !people) {
      return res.status(400).json({ message: "All fields are required" ,sucess: false});
    }
    const booking = new Booking({ name, email, phone, date, time, people });
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking , sucess: true});
    }
    catch (error) {
      res.status(500).json({ error: error.message ,sucess: false});
    }
}

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking
            .findById(id);
        if (!booking) { return res.status(404).json({ message: "Booking not found",sucess: false }); }
        res.status(200).json({ booking, sucess: true });
    }
    catch (error) {
        res.status(500).json({ error: error.message, sucess: false });
    }
};

export { createBooking, getBookingById };