const express = require("express");
const {
  createUserHandler,
  userLoginHandler,
  getUserHandler,
} = require("./auth.controller");
const authMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();

// Route to sign up a new normal user
router.post("/register", createUserHandler);

// Route to sign up a new normal user
router.post("/login", userLoginHandler);

// Route to get user details
router.get("/me", authMiddleware("user", "admin"), getUserHandler);

module.exports = router;
