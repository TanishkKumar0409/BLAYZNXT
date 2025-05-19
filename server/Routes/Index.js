import express from "express";
import multer from "multer";
import path from "path";

import registerUser from "../Controllers/Auth/Register.js";
import Login from "../Controllers/Auth/Login.js";
import GetProfile from "../Controllers/Auth/GetProfile.js";
import Logout from "../Controllers/Auth/Logout.js";
import VerifyEmail from "../Controllers/Auth/VerifyEmail.js";
import ResendVerifyOTP from "../Controllers/Auth/ResendVerifyOtp.js";
import SendForgotPasswordOtp from "../Controllers/Auth/SendForgotPasswordOtp.js";
import ChangePassword from "../Controllers/Auth/ChangePassword.js";
import UpdateStatus from "../Controllers/Auth/UpdateStatus.js";
import UpdateRole from "../Controllers/Auth/UpdateRole.js";
import GetAllUsers from "../Controllers/User/GetAllUser.js";
import GetUserByUsername from "../Controllers/User/GetUserByUsername.js";
import AddNewsletter from "../Controllers/ContactUs/AddNewsletter.js";
import GetNewsletter from "../Controllers/ContactUs/GetNewsletter.js";
import AddQuery from "../Controllers/ContactUs/AddQuery.js";
import GetAllQuery from "../Controllers/ContactUs/GetAllQuery.js";
import DeleteQuery from "../Controllers/ContactUs/DeleteQuery.js";
import GetFolderForUser from "../Controllers/Storage/GetFolderForUser.js";
import FileUpload from "../Controllers/Storage/FileUpdload.js";
import CreateFolder from "../Controllers/Storage/CreateFolder.js";
import DownloadStoredFile from "../Controllers/Storage/DownloadStoredFile.js";
import DeleteFolder from "../Controllers/Storage/DeleteFolder.js";
import GetSharedHistoryByUsername from "../Controllers/Sharing/GetSharedHistoryByUsername.js";
import GetParticularFile from "../Controllers/Storage/GetParticularFile.js";
import RecentFile from "../Controllers/Recents/RecentsFile.js";
import GetRecents from "../Controllers/Recents/GetRecents.js";
import ShareFiles from "../Controllers/Sharing/ShareFiles.js";
import DownloadSharedFiles from "../Controllers/Sharing/DownloadSharedFiles.js";
import GetToken from "../Controllers/Auth/GetToken.js";
import DeleteSharingFiles from "../Controllers/FolderCleaners/DeleteSharingFiles.js";
import ProfileChange from "../Controllers/User/ProfileChange.js";
import UpdateUser from "../Controllers/User/UpdateUser.js";
import DeleteProfileImage from "../Controllers/User/DeleteProfile.js";
import AccountDeletionOTP from "../Controllers/Auth/AccountDeletionOTP.js";
import AccountDeletion from "../Controllers/Auth/AccountDeletion.js";
import GetQueryByObjectId from "../Controllers/ContactUs/GetQueryByObjectId.js";
import UpdateQueryStatus from "../Controllers/ContactUs/UpdateQueryStatus.js";
import CreateAndUpdateLegals from "../Controllers/Legals/CreateAndUpdateLegal.js";
import GetLegals from "../Controllers/Legals/GetLegals.js";
import HandleFolderCleaner from "../Controllers/FolderCleaners/FolderCleanersCall.js";

const routes = express.Router();
routes.use(express.json({ limit: "10gb" }));
routes.use(express.urlencoded({ extended: true, limit: "10gb" }));
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

const uploadProfile = multer({
  storage: UserProfileStorage,
  limits: {
    fieldSize: 10 * 1024 * 1024,
    fileSize: 5 * 1024 * 1024,
  },
});

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
  limits: {
    fieldSize: 10 * 1024 * 1024 * 1024,
    fileSize: 5 * 1024 * 1024 * 1024,
  },
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

//? Auth Routes
routes.post("/register", registerUser);
routes.post("/login", Login);
routes.get("/logout", Logout);
routes.get("/profile", GetProfile);
routes.get("/get-token", GetToken);
routes.post("/verify/:username", VerifyEmail);
routes.get("/verify/resend/:username", ResendVerifyOTP);
routes.post("/password/change/opt", SendForgotPasswordOtp);
routes.post("/password/change", ChangePassword);
routes.patch("/status/:username/:status", UpdateStatus);
routes.patch("/role/:username/:role", UpdateRole);
routes.post("/user/delete/account/otp", AccountDeletionOTP);
routes.post("/user/delete/account/:username", AccountDeletion);

//? User Routes
routes.get(`/users`, GetAllUsers);
routes.patch(
  `/user/profile/:username`,
  uploadProfile.single("profile"),
  ProfileChange
);
routes.get(`/user/:username`, GetUserByUsername);
routes.delete(`/user/:username`, DeleteProfileImage);
routes.patch(`/user/:username`, UpdateUser);

//? Contact Us Routes
routes.post(`/newsletter`, AddNewsletter);
routes.get(`/newsletter`, GetNewsletter);
routes.post(`/contact`, AddQuery);
routes.get(`/contact`, GetAllQuery);
routes.delete(`/contact/:id`, DeleteQuery);
routes.get(`/contact/:id`, GetQueryByObjectId);
routes.patch(`/contact/:id`, UpdateQueryStatus);

//? Legal Routes
routes.post(`/legal`, CreateAndUpdateLegals);
routes.get(`/legal`, GetLegals);

//? Sharing Routes
routes.post("/share/:username", UploadFileShare.any("files"), ShareFiles);
routes.get(`/share/history/user/:username`, GetSharedHistoryByUsername);
routes.get(`/share/download/:sharingId`, DownloadSharedFiles);

//? Storage Routes
routes.get(`/storage/all/:username`, GetFolderForUser);
routes.post(
  "/storage/file/upload/:username",
  uploadFile.array("files"),
  FileUpload
);
routes.delete("/storage/folder/delete", DeleteFolder);
routes.get("/storage/file/download", DownloadStoredFile);
routes.post("/storage/folder/create", CreateFolder);
routes.get("/storage/file/single", GetParticularFile);

//? Recents Routes
routes.post(`/storage/recent`, RecentFile);
routes.get(`/storage/recent/:username`, GetRecents);

//? Extras
routes.get(`/folderCleaner`, HandleFolderCleaner);

export default routes;
