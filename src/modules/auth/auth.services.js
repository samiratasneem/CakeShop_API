const { StatusCodes } = require("http-status-codes"); // Import HTTP status codes
const AppError = require("../../errors/AppError"); // Custom error handling class
const { generateToken } = require("../../helper/utils/tokenUtils"); // Function to generate authentication token
const User = require("./auth.model"); // Importing the User model

// Creates a new user in the database.
// The user data containing name, email, password, etc.
const createUser = async (data) => {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new AppError(400, "Email already registered");
  const user = await User.create(data);
  const token = generateToken(user._id, user.role);

  return { user, token };
};

// Handles user login by verifying data and generating an authentication token.
// The login data containing email and password.
const userLogin = async (data) => {
  // Find the user by email and explicitly select the password field
  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user || data.password !== user.password) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password.");
  }

  // Remove the password field from the returned user object
  const { password, ...userWithoutPassword } = user.toObject();

  const token = generateToken(user._id, user.role);

  return { token, role: user.role, user: userWithoutPassword };
};

// Get the user profile from database
// The user object containing the user's id and role.
const getUser = async (user) => {
  // Check if the user object has a valid _id
  if (!user._id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Access denied. Insufficient permissions."
    );
  }

  const foundUser = await User.findById(user._id);

  if (!foundUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found.");
  }

  return foundUser;
};

// Finds a user by their email.
const findUserWithEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  return user;
};

module.exports = {
  createUser,
  userLogin,
  getUser,
  findUserWithEmail,
};
