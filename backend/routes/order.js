const express = require('express');

const router = express.Router();
const { protect } = require('../middlewares/auth');
const orderController = require('../controllers/orderController');

router.use(protect);
router
  .route('/')
  .get(orderController.getUserOrder)
  .post(orderController.createOrder);
router.get('/:id', orderController.getSingleOrder);

module.exports = router;
