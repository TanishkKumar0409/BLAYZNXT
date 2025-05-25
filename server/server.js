import express from "express";
import cors from "cors";
import routes from "./Routes/Index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import redirector from "./Controllers/Sharing/Redirector.js";
import fs from "fs";
import path from "path";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const foldersToCreate = [
  "Uploads/Users",
  "Uploads/ZipFolder",
  "Uploads/Explorer",
  "Uploads/ShareFiles",
];

foldersToCreate.forEach((folder) => {
  const fullPath = path.resolve(folder);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/api", routes);

app.use(express.static("public"));
app.use("/Uploads", express.static("Uploads"));

app.get("/:id", redirector);

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Welcome To BLAYZNXT");
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const handleStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

handleStart();
