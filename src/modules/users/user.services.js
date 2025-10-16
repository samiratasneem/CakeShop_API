const AppError = require('../../errors/AppError');
const { StatusCodes } = require('http-status-codes');
const User = require('../auth/auth.model');

const getMe = (id) =>
  User.findById(id)
    .select('-password')
    .populate('favorites')
    .populate('cart.cake');

const toggleFavorite = async (userId, cakeId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');

  const idx = user.favorites.findIndex((c) => c.toString() === cakeId);
  if (idx > -1) user.favorites.splice(idx, 1);
  else user.favorites.push(cakeId);

  await user.save();
  return user.populate('favorites');
};

const addToCart = async (userId, { cake, qty = 1 }) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');

  const item = user.cart.find((it) => it.cake.toString() === cake);
  if (item) item.qty += qty;
  else user.cart.push({ cake, qty });

  await user.save();
  return user.populate('cart.cake');
};

const updateCartItem = async (userId, { cake, qty }) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');

  const item = user.cart.find((it) => it.cake.toString() === cake);
  if (!item) throw new AppError(StatusCodes.NOT_FOUND, 'Item not in cart');

  item.qty = qty;
  if (item.qty <= 0) {
    user.cart = user.cart.filter((it) => it.cake.toString() !== cake);
  }

  await user.save();
  return user.populate('cart.cake');
};

const clearCart = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  user.cart = [];
  await user.save();
  return user;
};

// Admin views
const adminListUsers = () => User.find().select('-password').sort('-createdAt');
const adminGetUser = (id) =>
  User.findById(id).select('-password').populate('favorites').populate('cart.cake');


const adminUpdateUser = async (id, payload) => {
  const user = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .select('-password')
    .populate('favorites')
    .populate('cart.cake');

  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  return user;
};

const adminDeleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id).select('-password');
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  return user;
};
module.exports = {
  getMe,
  toggleFavorite,
  addToCart,
  updateCartItem,
  clearCart,
  adminListUsers,
  adminGetUser,
  adminUpdateUser,
  adminDeleteUser,
};
