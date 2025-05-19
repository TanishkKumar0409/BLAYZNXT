import mongoose from "mongoose";
import { RegularDatabase } from "../DataBases/Databases.js";

const HistorySchema = mongoose.Schema(
  {
    senderUsername: {
      type: String,
      required: true,
    },
    sharingId: {
      type: Number,
      requried: true,
    },
    fileName: {
      type: [String],
      required: true,
    },
    filePath: {
      type: [String],
      required: true,
    },
    receiverEmail: {
      type: String,
      requried: true,
    },
    message: {
      type: String,
      required: true,
    },
    downloadLink: {
      type: String,
      required: true,
    },
    downloadLinkExpiry: {
      type: Date,
      required: true,
    },
    deleteStatus: {
      type: String,
      required: true,
    },
    sharedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const History = RegularDatabase.model("FileHistory", HistorySchema);

export default History;
