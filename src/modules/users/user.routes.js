const express = require("express");
const {
  profile,
  favToggle,
  cartAdd,
  cartUpdate,
  cartClear,
  adminUsers,
  adminUserById,
  adminUpdateUser,
  adminDeleteUser,
} = require("./user.controller"); // ✅ controller থেকে আনতে হবে
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

// me
router.get("/me", authMiddleware("user", "admin"), profile);
router.post("/favorites/toggle", authMiddleware("user", "admin"), favToggle);
router.post("/cart", authMiddleware("user", "admin"), cartAdd);
router.patch("/cart", authMiddleware("user", "admin"), cartUpdate);
router.delete("/cart", authMiddleware("user", "admin"), cartClear);

// admin
router.get("/", authMiddleware("admin"), adminUsers);
router.get("/:id", authMiddleware("admin"), adminUserById);
router.patch("/:id", authMiddleware("admin"), adminUpdateUser); // ✅ এখন controller ব্যবহার
router.delete("/:id", authMiddleware("admin"), adminDeleteUser); // ✅ এখন controller ব্যবহার

module.exports = router;
