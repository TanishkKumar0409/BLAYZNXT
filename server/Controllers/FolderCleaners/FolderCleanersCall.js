import CancelDelete from "./CancelDelete.js";
import DeleteSharingFiles from "./DeleteSharingFiles.js";
import NotChangedPassword from "./NotChangePassword.js";
import ProfilesCleaner from "./ProfilesCleaner.js";
import StorageCleaner from "./StorageCleaner.js";
import Unverifyed from "./Unverified.js";

const HandleFolderCleaner = async (req, res) => {
  try {
    await DeleteSharingFiles();
    await StorageCleaner();
    await ProfilesCleaner();
    await CancelDelete();
    await NotChangedPassword();
    await Unverifyed();
  } catch (error) {
    console.log(error.message);
  }
};

export default HandleFolderCleaner;
