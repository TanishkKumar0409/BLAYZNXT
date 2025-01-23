import express from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import router from "./Routes/Index.js";

import deleteShareingFiles from "./Helper/folderCleaner/DeleteSharingFiles.js";
import ProfilesCleaner from "./Helper/folderCleaner/UserProfileCleaner.js";
import CancelDelete from "./Helper/DbCleaner/CancelDelete.js";
import StorageCleaner from "./Helper/folderCleaner/DeleteExplorerFiles.js";
import NotChangedPassword from "./Helper/DbCleaner/NotChangedPassword.js";
import UnVerifyed from "./Helper/DbCleaner/UnVerifyed.js";

dotenv.config();

const PORT = process.env.PORT;
const DbName = process.env.DbName;

const app = express();

app.use(cors());

app.use(express.static("public"));
app.use("/Uploads", express.static("Uploads"));

app.use(bodyparser.json());

app.use("/api/", router);

setInterval(() => {
  deleteShareingFiles();
  ProfilesCleaner();
  CancelDelete();
  NotChangedPassword();
  StorageCleaner();
  UnVerifyed();
}, 5 * 60 * 1000);

mongoose
  .connect(DbName)
  .then(() => console.log(`Database Connected`))
  .catch((error) => console.log(error));

const handleStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

handleStart();
