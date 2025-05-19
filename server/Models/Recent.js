import mongoose from "mongoose";
import { RegularDatabase } from "../DataBases/Databases.js";

const RecentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  recentFiles: [
    {
      folderId: {
        type: Number,
        required: true,
      },
      usedDate: {
        type: Date,
        required: true,
      },
    },
  ],
});

const Recent = RegularDatabase.model("Recent", RecentSchema);

export default Recent;
