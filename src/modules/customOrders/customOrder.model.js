const mongoose = require('mongoose');

const customOrderSchema = new mongoose.Schema(
  {
    // 🔹 Common Order fields
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
      default: 'pending',
    },
    total: { type: Number, required: true, min: 0, default: 0 },
    paymentMethod: {
      type: String,
      enum: ['online_payment', 'cash_on_delivery'],
      default: 'cash_on_delivery',
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

    // 🔹 Custom extra fields
    title: { type: String, required: true },
    description: { type: String, default: '' },
    referenceImage: { type: String, default: '' },
    size: { type: String, default: '' },
    flavour: { type: String, default: '' },
    deliveryDate: { type: Date },
    quotedPrice: { type: Number, default: 0 },
    adminNote: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CustomOrder', customOrderSchema);
