const jwt = require('jsonwebtoken');
const User = require('../../../Models/user.schema');

const createAndSentJwtToken = (res, userData) => {
  const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  res.cookie('authentication', token, cookieOptions);

  res.status(200).json({
    isSuccess: true,
    userData,
  });
};

const userSignUpController = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(400).json({
      isSuccess: false,
      message: 'user Alreay exists',
    });
  }

  const userData = await User.create(req.body);
  createAndSentJwtToken(res, userData);
};

const userLoginController = async (req, res, next) => {
  try {
    // email, password entered by the user
    const { email, password } = req.body;

    // find the user with that email
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePasswords(password))) {
      res.status(401).json({
        isSuccess: false,
        message: 'Email or password required',
      });
    }

    createAndSentJwtToken(res, user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      isSuccess: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  userSignUpController,
  userLoginController,
};
