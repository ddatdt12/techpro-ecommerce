const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Product = require('../models/Product');
const APIFeatures = require('../utils/advancedResults');
const isValidUrl = (url) => {
  return url.match(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g,
  );
};

//@desc         get all product of logged in user
//@route        GET /api/products
//@access       PUBLIC
exports.getAllProducts = catchAsync(async (req, res, next) => {
  res.status(200).json(req.advancedResults);
});

//@desc         Create new product
//@route        POST /api/products
//@access       PRIVATE
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create({ ...req.body, slug: 'test' });

  res.status(201).json({
    success: true,
    data: newProduct,
  });
});

//@desc         Get single product
//@route        GET /api/products/:id
//@access       Public
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError(`No product found with id:${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

//@desc         Update  product
//@route        PUT /api/products/:id
//@access       PRIVATE
exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedProduct) {
    return next(new AppError(`No product found with id ${req.params.id}`, 404));
  }

  // if (updatedProduct.user.toString() !== req.user._id.toString()) {
  //   return next(
  //     new AppError('You do not have permission to update this product !', 403),
  //   );
  // }

  res.status(200).json({
    success: true,
    data: updatedProduct,
  });
});

//@desc         Delete  product
//@route        DELETE /api/products/:id
//@access       PRIVATE
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const deletedProduct = await product.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    return next(new AppError(`Product not found with ${req.params.id} `));
  }

  if (deletedProduct.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You do not have permission to delete this product !', 403),
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
