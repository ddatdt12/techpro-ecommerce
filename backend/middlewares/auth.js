const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');
const { setJWTCookie } = require('../utils/support');
const AppError = require('../utils/AppError');
const User = require('../models/User');

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  let decoded;
  // 2) Verification token
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    //Delete wrong jwt cookie
    setJWTCookie(res);
    return next(new AppError('Invalid Token', 403));
  }

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    //Delete wrong jwt cookie
    setJWTCookie(res);
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  // // 4) Check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again.', 401)
  //   );
  // }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
