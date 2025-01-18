import express from "express";
import multer from "multer";
import path from "path";

import RegisterUser from "../Controllers/Users/RegisterUser.js";
import GetUsers from "../Controllers/Users/GetUsers.js";
import GetUserByUsername from "../Controllers/Users/GetUserByUsername.js";
import DeleteUser from "../Controllers/Users/DeleteUser.js";
import UpdateByUser from "../Controllers/Users/UpdateByUser.js";
import Login from "../Controllers/Users/Login.js";
import UserContactUs from "../Controllers/Users/UserContactUs.js";

import BlockUser from "../Controllers/Admin/BlockUser.js";
import CreateAdmin from "../Controllers/Admin/CreateAdmin.js";
import RemoveAdmin from "../Controllers/Admin/RemoveAdmin.js";

import ShareFiles from "../Controllers/SharedFiles/ShareFile.js";
import GetSharedHistory from "../Controllers/SharedFiles/GetSharedHistory.js";
import GetSharedHistoryByUsername from "../Controllers/SharedFiles/GetSharedHistoryByUsername.js";
import DownloadFiles from "../Helper/DownloadFiles/DownloadFiles.js";
import DeletionOtp from "../Controllers/Users/DeletionOtp.js";
import GetDataByDownloadLink from "../Controllers/SharedFiles/GetDataByDownloadLink.js";

import CreateFolder from "../Controllers/Storage/CreateFolder.js";
import GetFolder from "../Controllers/Storage/GetFolders.js";
import FileUpload from "../Controllers/Storage/FileUpload.js";
import DeleteFolder from "../Controllers/Storage/DeleteFolder.js";
import DownloadStoredFile from "../Controllers/Storage/DownloadStoredFile.js";
import GetParticularFile from "../Controllers/Storage/GetPartiCularFile.js";
import RecentFile from "../Controllers/Storage/RecentFile.js";
import GetRecents from "../Controllers/Storage/GetRecents.js";
import GetAdmin from "../Controllers/Admin/GetAdmins.js";
import GetContactQuery from "../Controllers/Users/GetContactQuery.js";
import DeleteContactQuery from "../Controllers/Users/DeleteContactQuery.js";
import NewsletterAdd from "../Controllers/Users/NewsletterAdd.js";
import GetNewsletter from "../Controllers/Users/GetNewsletters.js";
import VerifyOTP from "../Controllers/Users/VerifyOtp.js";
import ChangePasswordSendOtp from "../Controllers/Users/ChangePasswordSendOtp.js";
import ChangePassword from "../Controllers/Users/ChangePassword.js";
import VerifySendOtp from "../Controllers/Users/VerifySendOtp.js";

const router = express.Router();

//? User profile Multer
const UserProfileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    const originalExtension = path.extname(file.originalname);
    cb(null, "Uploads/Users/" + Date.now() + originalExtension);
  },
});

const uploadProfile = multer({ storage: UserProfileStorage });

//? Sharing File Multer
const FileShare = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    const originalExtension = path.extname(file.originalname);
    const randomNumber = Math.round(Math.random() * 500000);
    cb(
      null,
      "Uploads/shareFiles/" + randomNumber + Date.now() + originalExtension
    );
  },
});

const UploadFileShare = multer({
  storage: FileShare,
});

//? Storage File Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    const originalExtension = path.extname(file.originalname);
    const randomNumber = Math.round(Math.random() * 500000);
    cb(
      null,
      "Uploads/Explorer/" + randomNumber + Date.now() + originalExtension
    );
  },
});

const uploadFile = multer({ storage: storage });

//? Users Routes
router.post("/user/register", uploadProfile.single("profile"), RegisterUser);
router.post("/user/login", Login);
router.get("/user/all", GetUsers);
router.get("/user/:username", GetUserByUsername);
router.delete("/user/delete/:username", DeleteUser);
router.put(
  "/user/update/:username",
  uploadProfile.single("profile"),
  UpdateByUser
);
router.post("/user/delete/otp", DeletionOtp);
router.post("/user/contact", UserContactUs);
router.get("/user/contact/query", GetContactQuery);
router.delete("/user/contact/query/:id", DeleteContactQuery);
router.post("/user/newsletter", NewsletterAdd);
router.get("/user/newsletter/all", GetNewsletter);
router.post("/user/verify/:username", VerifyOTP);
router.post("/user/change/password/otp", ChangePasswordSendOtp);
router.put("/user/change/password", ChangePassword);
router.post("/user/verify/send/:username", VerifySendOtp);

//? Admin Actions
router.put("/user/block/:username", BlockUser);
router.put("/user/promote/:username", CreateAdmin);
router.put("/user/demote/:username", RemoveAdmin);
router.get("/user/admin/all", GetAdmin);

//? Sharing Routes
router.post("/share/:username", UploadFileShare.any("files"), ShareFiles);
router.get("/share/download/:sharingId", DownloadFiles);
router.get("/share/history", GetSharedHistory);
router.get("/share/history/user/:username", GetSharedHistoryByUsername);
router.get("/share/history/downloader/:username", GetDataByDownloadLink);

//? Storage Routes
router.post("/storage/folder/create", CreateFolder);
router.get("/storage/folder/:username", GetFolder);
router.post(
  "/storage/file/upload/:username",
  uploadFile.array("files"),
  FileUpload
);
router.delete("/storage/folder/delete", DeleteFolder);
router.get("/storage/file/download", DownloadStoredFile);
router.get("/storage/file/single", GetParticularFile);
router.post("/storage/recent", RecentFile);
router.get("/storage/recent/:username", GetRecents);

export default router;
