import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const order = await Order.create(req.body); // expects items,total,city,paymentMethod,shippingAddress
  res.status(201).json(order);
}));

router.get('/', protect, adminOnly, asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('items.product').sort({ createdAt: -1 });
  res.json(orders);
}));

router.put('/:id/status', protect, adminOnly, asyncHandler(async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(updated);
}));

export default router;
