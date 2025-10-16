const Order = require("./order.model");
const AppError = require("../../errors/AppError");
const { StatusCodes } = require("http-status-codes");

// create new order
const createOrder = async (payload) => {
  try {
    const order = await Order.create(payload);

    // populate user and items.cake safely
    await order.populate("user");
    await order.populate("items.cake");

    return order;
  } catch (err) {
    console.error("❌ createOrder failed:", err);
    throw err;
  }
};


// user orders
const myOrders = (userId) =>
  Order.find({ user: userId }).populate("user").populate("items.cake");

// admin: all orders
const listOrders = () =>
  Order.find().populate("user").populate("items.cake");

// single order
const getOrder = async (id) => {
  const order = await Order.findById(id)
    .populate("user")
    .populate("items.cake");
  if (!order) throw new AppError(StatusCodes.NOT_FOUND, "Order not found");

   // remove null cakes
  order.items = order.items.filter((i) => i.cake !== null);

  return order;
};

// update status (admin)
const setStatus = async (id, status) => {
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .populate("user")
    .populate("items.cake");

  if (!order) throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  return order;
};

// update order (general: user or admin)
const updateOrder = async (id, payload) => {
  const order = await Order.findByIdAndUpdate(id, payload, { new: true })
    .populate("user")
    .populate("items.cake");

  if (!order) throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  return order;
};

// delete order (admin)
const deleteOrder = async (id) => {
  const order = await Order.findByIdAndDelete(id)
    .populate("user")
    .populate("items.cake");

  if (!order) throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  return order;
};

module.exports = {
  createOrder,
  myOrders,
  listOrders,
  getOrder,
  setStatus,
  updateOrder,
  deleteOrder,
};
