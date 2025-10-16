const catchAsync = require("../../helper/utils/catchAsync");
const sendResponse = require("../../helper/utils/sendResponse");
const { StatusCodes } = require("http-status-codes");
const userServices = require("./auth.services");

// Handler to create a new user
const createUserHandler = catchAsync(async (req, res) => {
  const user = await userServices.createUser(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

// Handler to login a user
const userLoginHandler = catchAsync(async (req, res) => {
  const result = await userServices.userLogin(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

// Handler to get user details
const getUserHandler = catchAsync(async (req, res) => {
  const result = await userServices.getUser(req.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

module.exports = {
  createUserHandler,
  userLoginHandler,
  getUserHandler,
};
