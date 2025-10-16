const catchAsync = require("../../helper/utils/catchAsync");
const sendResponse = require("../../helper/utils/sendResponse");
const { StatusCodes } = require("http-status-codes");

const {
  createCake,
  listCakes,
  getCake,
  updateCake,
  deleteCake,
} = require("./cake.services");

const create = catchAsync(async (req, res) => {
  const data = await createCake(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Cake created successfully",
    data: data,
  });
});

const list = catchAsync(async (req, res) => {
  const data = await listCakes(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "All cakes",
    data: data,
  });
});

const read = catchAsync(async (req, res) => {
  const data = await getCake(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Cake details",
    data: data,
  });
});

const update = catchAsync(async (req, res) => {
  const data = await updateCake(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Cake updated successfully",
    data: data,
  });
});

const remove = catchAsync(async (req, res) => {
  const data = await deleteCake(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Cake deleted successfully",
    data: data,
  })
});

module.exports = {
  create,
  list,
  read,
  update,
  remove,
};
