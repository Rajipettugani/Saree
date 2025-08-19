import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect, adminOnly } from '../middleware/auth.js';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const { q, category, min, max } = req.query;
  const filter = {};
  if (q) filter.name = new RegExp(q, 'i');
  if (category) filter.category = category;
  if (min || max) filter.price = { ...(min ? { $gte: Number(min) } : {}), ...(max ? { $lte: Number(max) } : {}) };
  const products = await Product.find(filter).populate('categoryRef').sort({ createdAt: -1 });
  res.json(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const p = await Product.findById(req.params.id).populate('categoryRef');
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
}));

router.post('/', protect, adminOnly, asyncHandler(async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json(p);
}));

router.put('/:id', protect, adminOnly, asyncHandler(async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
}));

router.delete('/:id', protect, adminOnly, asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}));

export default router;
