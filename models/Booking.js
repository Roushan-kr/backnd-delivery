import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // You could also use a Date object for storing both date and time if needed.
      required: true,
      trim: true,
    },
    people: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
