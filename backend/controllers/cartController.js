const Cart = require('../models/Cart');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
 
  res.status(200).json({
    success: true,
    cart,
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const { actionType, productId, quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError(`Product with ${productId} don't exist`, 404));
  }

  const index = cart.products.findIndex(
    (prod) => prod.product._id.toString() === productId,
  );

  if (actionType === 'REMOVE_ITEM') {
    if (index !== -1) {
      cart.products.splice(index, 1);
    } else {
      return next(new AppError(`Item with id ${productId} not exist !`, 404));
    }
    await cart.save();
    return res.status(200).json({
      success: true,
      cart,
    });
  }
  
  //Clear all products in cart after order successfully
  if (actionType === 'CLEAR_CART') {
    const cart = await Cart.findByIdAndUpdate(req.user.id, { products: [] });

    return res.status(200).json({
      success: true,
      cart,
    });
  }

  if (index !== -1) {
    cart.products[index].quantity = quantity;
  } else {
    cart.products.push({ product: productId, quantity });
    await cart.populate({
      path: 'products.product',
      select: 'name image price countInStock brand',
    });
  }

  await cart.save();
  res.status(200).json({
    success: true,
    cart,
  });
});

