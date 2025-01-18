import History from "../../Modals/History.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const deleteSharingFiles = async (req, res) => {
  const fileData = await History.find().sort({ sharingId: 1 });
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const unKnownFilePaths = path.join(__dirname, "../../Uploads/ShareFiles");

  try {
    const filesInFolder = await fs.readdir(unKnownFilePaths);

    const dbFilePaths = new Set();
    for (const record of fileData) {
      for (const filePath of record.filePath) {
        dbFilePaths.add(path.basename(filePath));
      }
    }

    for (const fileName of filesInFolder) {
      if (!dbFilePaths.has(fileName)) {
        const filePathToDelete = path.join(unKnownFilePaths, fileName);
        try {
          await fs.unlink(filePathToDelete);
          console.log(`Deleted file not in database: ${fileName}`);
        } catch (error) {
          console.error(`Error deleting file: ${fileName}`, error);
        }
      }
    }

    for (const record of fileData) {
      if (record.deleteStatus === "PENDING") {
        const currentTime = Date.now();

        if (currentTime > new Date(record.downloadLinkExpiry).getTime()) {
          for (let i = 0; i < record.filePath.length; i++) {
            try {
              const filePath = record.filePath[i];
              await fs.access(filePath);
              await fs.unlink(filePath);
            } catch (error) {
              if (error.code === "ENOENT") {
                console.log(`File does not exist: ${record.filePath[i]}`);
              } else {
                console.error(
                  `Error deleting file: ${record.filePath[i]}`,
                  error
                );
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
          }
        }
      }
    }
  } catch (error) {
    console.error("Error accessing templatePath or reading files:", error);
  }
};

export default deleteSharingFiles;
