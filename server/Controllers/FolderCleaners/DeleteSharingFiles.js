import History from "../../Models/History.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const DeleteSharingFiles = async (req, res) => {
  const fileData = await History.find().sort({ sharingId: 1 });
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const unKnownFilePaths = path.join(__dirname, "../../Uploads/ShareFiles");

  try {
    const filesInFolder = await fs.readdir(unKnownFilePaths);

    const dbFilePaths = new Set();
    for (const record of fileData) {
      for (const filePath of record.filePath) {
        dbFilePaths.add(path.basename(filePath).toLowerCase());
      }
    }

    for (const fileName of filesInFolder) {
      const normalizedFileName = fileName.toLowerCase();
      if (!dbFilePaths.has(normalizedFileName)) {
        const filePathToDelete = path.join(unKnownFilePaths, fileName);
        try {
          await fs.access(filePathToDelete);
          await fs.unlink(filePathToDelete);
          console.log(`Deleted file not in database: ${fileName}`);
        } catch (error) {
          if (error.code === "EPERM") {
            console.warn(
              `Permission denied (locked file): ${filePathToDelete}`
            );
          } else if (error.code === "ENOENT") {
            console.warn(
              `File already deleted or missing: ${filePathToDelete}`
            );
          } else {
            console.error(`Error deleting file: ${filePathToDelete}`, error);
          }
        }
      }
    }

    for (const record of fileData) {
      if (record.deleteStatus === "PENDING") {
        const currentTime = Date.now();
        const expiryTime = new Date(record.downloadLinkExpiry).getTime();

        if (currentTime > expiryTime) {
          for (let i = 0; i < record.filePath.length; i++) {
            const filePath = record.filePath[i];
            try {
              await fs.access(filePath);
              await fs.unlink(filePath);
            } catch (error) {
              if (error.code === "ENOENT") {
                console.log(
                  `File does not exist (already deleted): ${filePath}`
                );
              } else if (error.code === "EPERM") {
                console.warn(`Cannot delete (locked file): ${filePath}`);
              } else {
                console.error(`Error deleting file: ${filePath}`, error);
              }
            }
          }

          const updateResult = await History.findOneAndUpdate(
            { sharingId: record.sharingId },
            {
              $set: { deleteStatus: "DELETED" },
              $unset: {
                filePath: "",
                downloadLinkExpiry: "",
                downloadLink: "",
              },
            },
            { new: true }
          );

          if (!updateResult) {
            console.log(`Record with sharingId ${record.sharingId} not found.`);
          } else {
            console.log(`Record updated for sharingId ${record.sharingId}`);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error accessing ShareFiles folder or reading DB:", error);
  }
};

export default DeleteSharingFiles;
