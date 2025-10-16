const express = require('express');
const { create, mine, list, update, remove, userUpdate } = require('./customOrder.controller');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

// user
router.post('/', authMiddleware('user', 'admin'), create);
router.get('/mine', authMiddleware('user', 'admin'), mine);
// user update (নিজের অর্ডার এর মধ্যে সীমাবদ্ধ)
router.patch('/mine/:id', authMiddleware('user', 'admin'), userUpdate);
// admin
router.get('/', authMiddleware('admin'), list);
router.patch('/:id', authMiddleware('admin'), update);
router.delete('/:id', authMiddleware('admin'), remove);

module.exports = router;
