const CustomOrder = require('./customOrder.model');
const AppError = require('../../errors/AppError');
const { StatusCodes } = require('http-status-codes');

// create
const createCustomOrder = (payload) => CustomOrder.create(payload);

// list my custom orders
const listMyCustomOrders = (userId) =>
  CustomOrder.find({ user: userId }).sort('-createdAt');

// list all (admin)
const adminListCustomOrders = (query) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  return CustomOrder.find(filter)
    .populate('user', 'name email')
    .sort('-createdAt');
};

// update (admin/user safe fields)
const updateCustomOrder = async (id, payload) => {
  const allowed = [
    'status',
    'quotedPrice',
    'adminNote',
    'address',
    'phone',
    'note',
    'deliveryDate',
  ];

  const safePayload = {};
  for (let key of allowed) {
    if (payload[key] !== undefined) safePayload[key] = payload[key];
  }

  const doc = await CustomOrder.findByIdAndUpdate(id, safePayload, { new: true });
  if (!doc) throw new AppError(StatusCodes.NOT_FOUND, 'Custom order not found');
  return doc;
};

// delete
const deleteCustomOrder = async (id) => {
  const doc = await CustomOrder.findByIdAndDelete(id);
  if (!doc) throw new AppError(StatusCodes.NOT_FOUND, 'Custom order not found');
  return doc;
};

module.exports = {
  createCustomOrder,
  listMyCustomOrders,
  adminListCustomOrders,
  updateCustomOrder,
  deleteCustomOrder,
};
