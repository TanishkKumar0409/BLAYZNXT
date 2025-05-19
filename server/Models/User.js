import mongoose from "mongoose";
import { RegularDatabase } from "../DataBases/Databases.js";

const UsersSchema = mongoose.Schema(
  {
    profile: { type: String },
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
      enum: ["ADMIN", "USER"],
    },
    status: {
      type: String,
      requried: true,
      enum: ["ACTIVE", "BLOCKED"],
    },
    usedStorage: {
      type: Number,
      default: 0,
    },
    totalStorage: {
      type: Number,
      default: process.env.STORAGE * 1024 * 1024 * 1024,
    },
    password: {
      type: String,
      required: true,
    },
    deletionOtp: { type: Number },
    otpExpiry: { type: Date },
    verifyOTP: { type: Number },
    verifyOtpExpiry: { type: Date },
    passwordOtp: { type: Number },
    passwordOtpExpiry: { type: Date },
    address: { type: String },
    pincode: { type: Number },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Users = RegularDatabase.model("Users", UsersSchema);

export default Users;
