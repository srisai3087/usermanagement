const jwt = require('jsonwebtoken');
const User = require('../../Models/user.schema');
require('dotenv').config();

const protectedMiddleware = async (req, res, next) => {
  const token = req.cookies?.authentication;

  if (!token) {
    res.status(401).json({
      isSuccess: false,
      message: 'unauthrosized',
    });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.id);
  req.user = user;

  next();
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('unauthrozied!', 403));
    }
    next();
  };
};

module.exports = {
  protectedMiddleware,
  restrictTo,
};
