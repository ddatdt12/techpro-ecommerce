const jwt = require('jsonwebtoken');

const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const { createSendToken } = require('../utils/support');

//@desc         Register
//@route        POST /api/auth/register
//@access       Public
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const user = await User.create({ name, email, password, confirmPassword });

  createSendToken(user, 200, res);
});

//@desc         Login
//@route        POST /api/auth/login
//@access       Public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  if (!user)
    res.status(200).json({
      status: 'success',
      data: user,
    });

  createSendToken(user, 200, res);
});

//@desc         Check user is logged in
//@route        GET /api/auth
//@access       PRIVATE
exports.authenticate = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

//@desc         Log out user
//@route        GET /api/auth/logout
//@access       PRIVATE
exports.logout = (req, res) => {
  res.cookie('jwt', 'over', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: false,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });
  res.status(200).json({ success: true, data: {} });
};
