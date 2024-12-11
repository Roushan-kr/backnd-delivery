import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import {
  getAllDeliveries,
  getDeliveryById,
  createDelivery,
  updateDelivery,
  deleteDelivery
} from '../controllers/deliveryController.js';

const router = express.Router();

// Define routes and map to controllers
router.get('/', asyncHandler(getAllDeliveries));
router.get('/:id', asyncHandler(getDeliveryById));
router.post('/', asyncHandler(createDelivery));
router.put('/:id', asyncHandler(updateDelivery));
router.delete('/:id', asyncHandler(deleteDelivery));

export default router;
