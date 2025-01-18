import mongoose from "mongoose";
import { Schema } from "mongoose";

const folderSchema = new Schema({
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

const Storage = mongoose.model("storage", folderSchema);
export default Storage;
