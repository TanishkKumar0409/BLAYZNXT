import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Storage from "../../Models/Storage.js";

const StorageCleaner = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const unKnownFiles = path.join(__dirname, "../../Uploads/Explorer");

  try {
    const StorageData = await Storage.find();

    const files = StorageData.filter((file) => file.filePath).map((file) =>
      path.basename(file.filePath)
    );

    const filesInFolder = await fs.readdir(unKnownFiles);

    for (const file of filesInFolder) {
      if (!files.includes(file)) {
        const filePath = path.join(unKnownFiles, file);
        await fs.unlink(filePath);
        console.log(`Deleting Uploaded File: ${filePath}`);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default StorageCleaner;
