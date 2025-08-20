const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is invalid email',
      },
    },
    role: {
      type: String,
      enum: ['super-visor', 'admin'],
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [6, 'password must contain greater than 6 characters'],
      maxLength: [16, 'password does not exceed 16 characters'],
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (cnfPassword) {
          return this.password === cnfPassword;
        },
        message: 'passwords do not matched',
      },
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.comparePasswords = async function (userProvidedPassword) {
  return await bcrypt.compare(userProvidedPassword, this.password);
};

userSchema.methods.generateResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// -----------------validators----------------
userSchema.pre(/^find/, function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  console.log;
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
