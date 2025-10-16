const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    cake: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake', required: true },
    qty: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
      default: 'pending',
    },
    total: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ['online_payment', 'cash_on_delivery'],
      required: true,
    },
    txnId: { type: String, default: '' },
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    note: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
