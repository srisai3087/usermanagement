import mongoose from 'mongoose';
import Counter from './counter.schema.js';

const memberSchema = new mongoose.Schema(
  {
    memberId: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [
        /^[6-9]\d{9}$/,
        'Please enter a valid 10-digit Indian phone number',
      ],
      unique: true,
    },
    adharNum: {
      type: String,
      required: [true, 'Aadhar number is required'],
      match: [/^\d{12}$/, 'Aadhar number must be 12 digits'],
      unique: true,
    },
    panNum: {
      type: String,
      required: [true, 'PAN number is required'],
      match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format'],
      unique: true,
    },
    drivingLicence: {
      type: String,
      required: [true, 'Driving Licence number is required'],
      unique: true,
    },
    hubName: {
      type: String,
      required: [true, 'Hub is required'],
      enum: {
        values: ['hub1', 'hub2', 'hub3', 'hub4'],
        message: '{VALUE} is not a valid hub',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    DOB: {
      type: Date,
      required: [true, 'Date of Birth is required'],
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

memberSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'memberId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.memberId = counter.seq;
  }
  next();
});

const Member = mongoose.model('Member', memberSchema);

export default Member;
