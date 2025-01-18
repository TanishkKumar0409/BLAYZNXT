import mongoose from "mongoose";

const UsersSchema = mongoose.Schema(
  {
    profile: {
      type: String,
      requried: true,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      requried: true,
    },
    usedStorage: {
      type: Number,
      default: 0,
    },
    totalStorage: {
      type: Number,
      default: 1024 * 1024 * 1024,
    },
    password: {
      type: String,
      required: true,
    },
    deletionOtp: {
      type: Number,
    },
    otpExpiry: {
      type: Date,
    },
    verifyOTP: {
      type: Number,
    },
    verifyOtpExpiry: {
      type: Date,
    },
    passwordOtp: {
      type: Number,
    },
    passwordOtpExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UsersSchema);

export default Users;
