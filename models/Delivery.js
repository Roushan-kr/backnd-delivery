import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const deliverySchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number'],
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: {
        type: String,
        required: true,
        match: [/^\d{4,6}$/, 'Please enter a valid postal code']
      },
      country: { type: String, required: true }
    },
    orderItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    deliveryFee: {
      type: Number,
      required: true,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0
    },
    deliveryStatus: {
      type: String,
      enum: ['Pending', 'In Transit', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    deliveryDate: {
      type: Date,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending'
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Delivery = model('Delivery', deliverySchema);

export default Delivery;