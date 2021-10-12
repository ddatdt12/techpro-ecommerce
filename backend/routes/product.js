const express = require('express');

const router = express.Router();
const { protect } = require('../middlewares/auth');
const productController = require('../controllers/productController');
const advancedResults = require('../utils/advancedResults');
const Product = require('../models/Product');

router
  .route('/')
  .get(advancedResults(Product), productController.getAllProducts)
  .post(productController.createProduct);

// router.use(protect);
router
  .route('/:id')
  .get(productController.getProduct)
  .put(protect, productController.updateProduct)
  .delete(protect, productController.deleteProduct);

module.exports = router;
