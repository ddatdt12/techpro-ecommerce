const jwt = require('jsonwebtoken');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const setJWTCookie = (res, cookies = 'over', expires = 5 * 1000) => {
  res.cookie('jwt', cookies, {
    expires: new Date(Date.now() + expires),
    secure: false,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  setJWTCookie(
    res,
    token,
    process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  );

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

module.exports = { filterObj, signToken, setJWTCookie, createSendToken };
