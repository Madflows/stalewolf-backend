import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/music", userRoutes);

console.log("wahala");

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`.green);
});
