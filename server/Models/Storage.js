import mongoose from "mongoose";
import { RegularDatabase } from "../DataBases/Databases.js";

const folderSchema = new mongoose.Schema({
  folderId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  root: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["file", "folder"],
    required: true,
  },
  parentId: {
    type: Number,
    default: null,
  },
  children: [{ type: Number }],
  filePath: {
    type: String,
  },
  fileSize: {
    type: Number,
  },
});

const Storage = RegularDatabase.model("storage", folderSchema);
export default Storage;
