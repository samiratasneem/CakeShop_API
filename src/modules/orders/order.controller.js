const catchAsync = require("../../helper/utils/catchAsync");
const sendResponse = require("../../helper/utils/sendResponse");
const { StatusCodes } = require("http-status-codes");
const {
  createOrder,
  myOrders,
  listOrders,
  getOrder,
  setStatus,
  updateOrder,
  deleteOrder,
} = require("./order.services");

// user: create
const create = catchAsync(async (req, res) => {
  const data = await createOrder({ ...req.body, user: req.user._id });
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Order created successfully",
    data,
  });
});

// user: my orders
const mine = catchAsync(async (req, res) => {
  const data = await myOrders(req.user._id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "My orders",
    data,
  });
});

// admin: all
const list = catchAsync(async (req, res) => {
  const data = await listOrders();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All orders",
    data,
  });
});

// admin: set status
const updateStatus = catchAsync(async (req, res) => {
  const data = await setStatus(req.params.id, req.body.status);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order status updated",
    data,
  });
});

// user/admin: update (address, phone, paymentStatus, etc.)
const update = catchAsync(async (req, res) => {
  const data = await updateOrder(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order updated successfully",
    data,
  });
});

// admin: delete
const remove = catchAsync(async (req, res) => {
  const data = await deleteOrder(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order deleted successfully",
    data,
  });
});

module.exports = {
  create,
  mine,
  list,
  updateStatus,
  update,
  remove,
};
