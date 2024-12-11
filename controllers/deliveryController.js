import Delivery from '../models/Delivery.js'; 

// @desc Get all deliveries
export const getAllDeliveries = async (req, res) => {
  const deliveries = await Delivery.find();
  res.locals.data = { deliveries }; // Store data in res.locals
};

// @desc Get a delivery by ID
export const getDeliveryById = async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);

  if (delivery) {
    res.locals.data = { delivery }; // Store data in res.locals
  } else {
    res.status(404);
    throw new Error('Delivery not found');
  }
};

// @desc Create a new delivery
export const createDelivery = async (req, res) => {
  const {
    customerName,
    phoneNumber,
    email,
    deliveryAddress,
    orderItems,
    deliveryFee,
    totalAmount,
    deliveryDate,
    notes
  } = req.body;

  const delivery = new Delivery({
    customerName,
    phoneNumber,
    email,
    deliveryAddress,
    orderItems,
    deliveryFee,
    totalAmount,
    deliveryDate,
    notes
  });

  const createdDelivery = await delivery.save();
  res.status(201);
  res.locals.data = { createdDelivery }; // Store data in res.locals
};

// @desc Update a delivery
export const updateDelivery = async (req, res) => {
  const {
    customerName,
    phoneNumber,
    email,
    deliveryAddress,
    orderItems,
    deliveryFee,
    totalAmount,
    deliveryStatus,
    paymentStatus,
    deliveryDate,
    notes
  } = req.body;

  const delivery = await Delivery.findById(req.params.id);

  if (delivery) {
    delivery.customerName = customerName || delivery.customerName;
    delivery.phoneNumber = phoneNumber || delivery.phoneNumber;
    delivery.email = email || delivery.email;
    delivery.deliveryAddress = deliveryAddress || delivery.deliveryAddress;
    delivery.orderItems = orderItems || delivery.orderItems;
    delivery.deliveryFee = deliveryFee || delivery.deliveryFee;
    delivery.totalAmount = totalAmount || delivery.totalAmount;
    delivery.deliveryStatus = deliveryStatus || delivery.deliveryStatus;
    delivery.paymentStatus = paymentStatus || delivery.paymentStatus;
    delivery.deliveryDate = deliveryDate || delivery.deliveryDate;
    delivery.notes = notes || delivery.notes;

    const updatedDelivery = await delivery.save();
    res.locals.data = { updatedDelivery }; // Store data in res.locals
  } else {
    res.status(404);
    throw new Error('Delivery not found');
  }
};

// @desc Delete a delivery
export const deleteDelivery = async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);

  if (delivery) {
    await delivery.remove();
    res.locals.data = { message: 'Delivery removed' }; // Store data in res.locals
  } else {
    res.status(404);
    throw new Error('Delivery not found');
  }
};
