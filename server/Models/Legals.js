import mongoose from "mongoose";
import { RegularDatabase } from "../DataBases/Databases.js";

const legalSchema = mongoose.Schema(
  {
    tabId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    legal_description: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Legal = RegularDatabase.model("legals", legalSchema);

export default Legal;
