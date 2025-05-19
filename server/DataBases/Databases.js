import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const RegularDatabase = mongoose.createConnection(process.env.RDB_URL);
