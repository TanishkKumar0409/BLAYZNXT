import mongoose from "mongoose";
import { RegularDatabase } from "../DataBases/Databases.js";

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Contact = RegularDatabase.model("contact", contactSchema);

export default Contact;
