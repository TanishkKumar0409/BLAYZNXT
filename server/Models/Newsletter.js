import mongoose from "mongoose";
import { RegularDatabase } from "../DataBases/Databases.js";

const newsletterSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Newsletter = RegularDatabase.model("Newsletter", newsletterSchema);

export default Newsletter;
