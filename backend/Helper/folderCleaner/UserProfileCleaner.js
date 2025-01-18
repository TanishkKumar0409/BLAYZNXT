import Users from "../../Modals/Users.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const ProfilesCleaner = async () => {
  const Userdata = await Users.find();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const unKnownProfiles = path.join(__dirname, "../../Uploads/Users");

  try {
    const filesInFolder = await fs.readdir(unKnownProfiles);

    const profiles = Userdata.map((profile) => path.basename(profile.profile));

    for (const file of filesInFolder) {
      if (file !== "DefaultProfiles" && !profiles.includes(file)) {
        const filePath = path.join(unKnownProfiles, file);
        await fs.unlink(filePath);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default ProfilesCleaner;
