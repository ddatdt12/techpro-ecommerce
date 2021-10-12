const express = require('express');

const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middlewares/auth');

router.use(protect);
router
  .route('/')
  .get(cartController.getCart)
  .put(cartController.updateCart)

module.exports = router;
