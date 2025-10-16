const express = require('express');
const {
  create,
  mine,
  list,
  updateStatus,
  update,
  remove,
} = require('./order.controller');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

// user
router.post('/', authMiddleware('user', 'admin'), create);
router.get('/mine', authMiddleware('user', 'admin'), mine);
router.patch('/:id', authMiddleware('user', 'admin'), update);

// admin
router.get('/', authMiddleware('admin'), list);
router.patch('/:id/status', authMiddleware('admin'), updateStatus);
router.delete('/:id', authMiddleware('admin'), remove);

module.exports = router;
