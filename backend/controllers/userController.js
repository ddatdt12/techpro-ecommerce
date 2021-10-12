const User = require('../models/User');

const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { filterObj, createSendToken } = require('../utils/support');
//@desc         Update my Password
//@route        POST /api/users/updateMe
//@access       Public
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        `This route is not for password updates. Please use /updateMyPassword`,
        400,
      ),
    );
  }

  console.log(req.body);
  // 2) Filtered out unwanted fields names that aren't allowed to be updated
  const filteredObj = filterObj(
    req.body,
    'name',
    'email',
    'phoneNumber',
    'shippingAddress',
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});

//@desc         Update Password
//@route        POST /api/users/updateMyPassword
//@access       PRIVATE
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  res
    .status(200)
    .json({ success: true, message: 'Update password successfully' });
});
