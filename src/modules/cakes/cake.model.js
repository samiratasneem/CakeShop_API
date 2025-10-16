const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
    category: { type: String, enum: ['vanilla', 'chocolate', 'theme'], required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cake', cakeSchema);
