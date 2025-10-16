const catchAsync = require('../../helper/utils/catchAsync');
const sendResponse = require('../../helper/utils/sendResponse');
const { StatusCodes } = require('http-status-codes');
const svc = require('./customOrder.services');

// user create
const create = catchAsync(async (req, res) => {
  const payload = { ...req.body, user: req.user._id };
  const data = await svc.createCustomOrder(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: '✅ Custom order submitted',
    data,
  });
});

// user mine
const mine = catchAsync(async (req, res) => {
  const data = await svc.listMyCustomOrders(req.user._id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My custom orders',
    data,
  });
});

// admin list
const list = catchAsync(async (req, res) => {
  const data = await svc.adminListCustomOrders(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All custom orders',
    data,
  });
});

// admin update
const update = catchAsync(async (req, res) => {
  const data = await svc.updateCustomOrder(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Custom order updated',
    data,
  });
});

// admin delete
const remove = catchAsync(async (req, res) => {
  const data = await svc.deleteCustomOrder(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Custom order deleted',
    data,
  });
});

const userUpdate = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  // শুধু নিজের অর্ডার update করতে পারবে
  const order = await CustomOrder.findOne({ _id: id, user: userId });
  if (!order) {
    return res.status(StatusCodes.FORBIDDEN).json({
      success: false,
      message: '❌ You can update only your own orders',
    });
  }

  // just can add node and Cancel
  if (req.body.note !== undefined) {
    order.note = req.body.note;
  }
  if (req.body.status === 'cancelled' && order.status === 'pending') {
    order.status = 'cancelled';
  }

  await order.save();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order updated by user',
    data: order,
  });
});


module.exports = { create, mine, list, update, remove, userUpdate };
