const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  totalQuantity: { type: Number, default: 0 },
  itemsPrice: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

CartSchema.pre('save', async function (next) {
  this.itemsPrice = this.products
    .reduce(
      (prevValue, { product, quantity }) =>
        prevValue + product.price * quantity,
      0,
    )
    .toFixed(2);
  this.totalQuantity = this.products.reduce(
    (prevValue, { quantity }) => prevValue + quantity,
    0,
  );
  next();
});

CartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products.product',
    select: 'name image price countInStock brand',
  });
  next();
});

module.exports = mongoose.model('Cart', CartSchema);
