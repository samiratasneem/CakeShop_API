const catchAsync = require('../../helper/utils/catchAsync');
const sendResponse = require('../../helper/utils/sendResponse');
const { StatusCodes } = require('http-status-codes');
const svc = require('./user.services');

const profile = catchAsync(async (req, res) => {
  const data = await svc.getMe(req.user._id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'My profile',
    data,
  });
});

const favToggle = catchAsync(async (req, res) => {
  const data = await svc.toggleFavorite(req.user._id, req.body.cakeId);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Favorites updated',
    data: data.favorites,
  });
});

const cartAdd = catchAsync(async (req, res) => {
  const data = await svc.addToCart(req.user._id, req.body); // {cake, qty}
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Cart updated',
    data: data.cart,
  });
});

const cartUpdate = catchAsync(async (req, res) => {
  const data = await svc.updateCartItem(req.user._id, req.body); // {cake, qty}
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Cart item updated',
    data: data.cart,
  });
});

const cartClear = catchAsync(async (req, res) => {
  const data = await svc.clearCart(req.user._id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Cart cleared',
    data: data.cart,
  });
});

// Admin
const adminUsers = catchAsync(async (_req, res) => {
  const data = await svc.adminListUsers();
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Users',
    data,
  });
});

const adminUserById = catchAsync(async (req, res) => {
  const data = await svc.adminGetUser(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User detail',
    data,
  });
});

const adminUpdateUser = catchAsync(async (req, res) => {
  const data = await svc.adminUpdateUser(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully',
    data,
  });
});

const adminDeleteUser = catchAsync(async (req, res) => {
  const data = await svc.adminDeleteUser(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User deleted successfully',
    data,
  });
});


module.exports = {
  profile,
  favToggle,
  cartAdd,
  cartUpdate,
  cartClear,
  adminUsers,
  adminUserById,
  adminUpdateUser,
  adminDeleteUser,
};
