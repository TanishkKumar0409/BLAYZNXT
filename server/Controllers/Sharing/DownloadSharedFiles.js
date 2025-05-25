import History from "../../Models/History.js";
import archiver from "archiver";
import path from "path";
import fs from "fs";
import { pipeline } from "stream";

const DownloadSharedFiles = async (req, res) => {
  try {
    const { sharingId } = req.params;

    const historyRecord = await History.findOne({ sharingId });
    if (!historyRecord) {
      return res
        .status(404)
        .json({ error: "No files found for the given SharingId." });
    }

    if (Date.now() > new Date(historyRecord.downloadLinkExpiry)) {
      return res.status(410).json({ error: "This link has expired." });
    }

    const {
      senderUsername,
      fileName: fileNames,
      filePath: filePaths,
    } = historyRecord;

    if (!filePaths || !Array.isArray(filePaths) || filePaths.length === 0) {
      return res.status(400).json({ error: "No valid file paths available." });
    }

    if (!fileNames || fileNames.length !== filePaths.length) {
      return res
        .status(500)
        .json({ error: "Mismatch between file names and file paths." });
    }

    const zipFilename = `shared-files-${senderUsername}.zip`;
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${zipFilename}"`
    );
    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", { zlib: { level: 9 } });
    const addedFiles = new Set();

    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        console.warn("Archiver warning:", err);
      } else {
        throw err;
      }
    });

    archive.on("error", (err) => {
      console.error("Archiver error:", err);
      res.status(500).end("Error while creating ZIP archive.");
    });

    for (let i = 0; i < filePaths.length; i++) {
      const resolvedFilePath = path.resolve(filePaths[i]);
      const originalFileName = fileNames[i];

      if (fs.existsSync(resolvedFilePath)) {
        if (!addedFiles.has(resolvedFilePath)) {
          addedFiles.add(resolvedFilePath);
          archive.file(resolvedFilePath, { name: originalFileName });
        } else {
          console.warn(`Duplicate file skipped: ${resolvedFilePath}`);
        }
      } else {
        console.warn(`File not found, skipping: ${resolvedFilePath}`);
      }
    }

    pipeline(archive, res, (err) => {
      if (err) {
        console.error("Pipeline failed:", err);
        res.status(500).end("Download failed.");
      } else {
        console.log("Download pipeline succeeded.");
      }
    });

    await archive.finalize();
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default DownloadSharedFiles;
