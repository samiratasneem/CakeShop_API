const Cake = require("./cake.model");
const AppError = require("../../errors/AppError");
const { StatusCodes } = require("http-status-codes");

const createCake = (payload) => Cake.create(payload);

const listCakes = (query) => {
  const { category, search } = query;
  const filter = { isActive: true };
  if (category) filter.category = category;
  if (search) filter.name = { $regex: search, $options: "i" };
  return Cake.find(filter).sort("-createdAt");
};

const getCake = async (id) => {
  const cake = await Cake.findById(id);
  if (!cake) throw new AppError(StatusCodes.NOT_FOUND, "Cake not found");
  return cake;
};

const updateCake = async (id, payload) => {
  const cake = await Cake.findByIdAndUpdate(id, payload, { new: true });
  if (!cake) throw new AppError(StatusCodes.NOT_FOUND, "Cake not found");
  return cake;
};

const deleteCake = async (id) => {
  const cake = await Cake.findByIdAndDelete(id);
  if (!cake) throw new AppError(StatusCodes.NOT_FOUND, "Cake not found");
  return cake;
};

module.exports = {
  createCake,
  listCakes,
  getCake,
  updateCake,
  deleteCake,
};
