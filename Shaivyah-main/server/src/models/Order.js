import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    qty: { type: Number, default: 1 },
    price: Number
  }],
  total: Number,
  city: String,
  paymentMethod: { type: String, enum: ['COD','Online'], default: 'COD' },
  paymentStatus: { type: String, enum: ['pending','paid','failed'], default: 'pending' },
  razorpayOrderId: String,
  status: { type: String, enum: ['Pending','Processing','Shipped','Delivered','Cancelled'], default: 'Pending' },
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
