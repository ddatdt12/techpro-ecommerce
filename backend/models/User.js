const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Cart = require('./Cart');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please add a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Please enter a password at least 6 characters'],
    select: false,
  },
  phoneNumber: {
    type: String,
    minlength: [10, 'Please enter a valid phone number'],
    maxlength: [11, 'Please enter a valid phone number'],
  },
  shippingAddress: {
    address: { type: String },
    city: { type: String },
    district: { type: String },
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //This only works on SAVE and CREATE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: { type: Date, default: Date.now() },
});

UserSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

//Create cart for new user
UserSchema.pre('save', async function (next) {
  // isNew: true means document just created
  this.$locals.wasNew = this.isNew;
  next();
});

UserSchema.post('save', async function () {
  // If user is new , create cart for them
  if (this.$locals.wasNew) {
    await Cart.create({ user: this._id, products: [] });
  }
});

UserSchema.methods.correctPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
