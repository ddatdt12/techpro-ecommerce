const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
  reviews: [ReviewSchema],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

ProductSchema.pre('findOneAndUpdate', async function (next) {
  const prod = await this.model.findOne(this.getQuery());
  if (this['_update'].name) {
    //Change slug of product when name is changed
    await prod.save();
  }
  next();
});
module.exports = mongoose.model('Product', ProductSchema);
