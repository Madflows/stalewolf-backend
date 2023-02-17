import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();
const PORT = 5000;

const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/music", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Club request api",
    routes: {
      "list-all-songs": "GET /api/music",
      "make-a-request (WIP)": "POST /api/requests",
      "list-all-requests (WIP)": "GET /api/requests",
      "delete-request (WIP)": "DELETE /api/requests/:id",
    }
  })
})

console.log("wahala");

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`.green);
});
