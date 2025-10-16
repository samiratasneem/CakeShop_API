const express = require("express");
const {create,
  list,
  read,
  update,
  remove,
} = require("./cake.controller");
const authMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();

// Public: user tab-wise view -> /cakes?category=vanilla|chocolate|theme
router.get('/', list);
router.get('/:id', read);

// Admin CRUD
router.post('/', authMiddleware('admin'), create);
router.patch('/:id', authMiddleware('admin'), update);
router.delete('/:id', authMiddleware('admin'), remove);

module.exports = router;
