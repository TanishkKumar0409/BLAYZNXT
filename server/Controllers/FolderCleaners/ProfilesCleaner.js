import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Users from "../../Models/User.js";

const ProfilesCleaner = async () => {
  const Userdata = await Users.find();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const unKnownProfiles = path.join(__dirname, "../../Uploads/Users");

  try {
    const filesInFolder = await fs.readdir(unKnownProfiles);

    const profiles = Userdata.map(
      (profile) => profile.profile && path.basename(profile.profile)
    ).filter(Boolean);

    for (const file of filesInFolder) {
      if (!profiles.includes(file)) {
        const filePath = path.join(unKnownProfiles, file);
        await fs.unlink(filePath);
      }
    }
  } catch (error) {
    console.error("Error cleaning profiles:", error.message);
  }
};

export default ProfilesCleaner;
