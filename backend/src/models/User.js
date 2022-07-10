const { Schema, model } = require('mongoose');
const { TEACHER } = require('utilities/constants');
const { ROLE } = require('./Enum');

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: TEACHER,
      enum: ROLE,
    },
    isKycDocValid: {
      type: Boolean,
      default: false,
    },
    kycDocRejectionMsg: {
      type: String,
    },
    isUserDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = model('User', User);
