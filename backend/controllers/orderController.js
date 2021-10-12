const Order = require('../models/Order');
const Cart = require('../models/Cart');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

//@desc         Create Order
//@route        POST /api/orders
//@access       PRIVATE
exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    phoneNumber,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    discountPrice,
    totalPrice,
  } = req.body;
  orderItems.forEach((item) => {
    item.product = item.productId;
    delete item.productId, item._id, item.countInStock;
  });
  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    phoneNumber,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    discountPrice,
    totalPrice,
  });

  //Clear all products in cart after order successfully
  await Cart.findByIdAndUpdate(req.user._id, { products: [] });

  res.status(201).json({
    success: true,
    order,
  });
});

//@desc         Get all orders of a particular user
//@route        GET /api/orders
//@access       PRIVATE
exports.getUserOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//@desc         Get single order of a particular user
//@route        GET /api/orders/:id
//@access       PRIVATE
exports.getSingleOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user.id,
  }).populate({
    path: 'user',
    select: 'email name phoneNumber',
  });

  if (!order) {
    return next(new AppError(`Order not found!`, 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});
