import express from "express";
import * as dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();
const PORT = 5000;

const app = express();
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'https://club-stale-wolf.vercel.app',
  'https://stale-wolf.vercel.app'
]; // add additional origins as needed

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    exposedHeaders: [
      'Access-Control-Allow-Credentials',
      'Access-Control-Allow-Origin',
    ],
  })
);


app.use(express.json());
app.use(cookieParser())
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/music", userRoutes);
app.use("/api/request", requestRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Club request api",
    routes: {
      "list-all-songs": "GET /api/music",
      "make-a-request": "POST /api/requests",
      "list-all-requests": "GET /api/requests",
      "mark-as-played": "DELETE /api/requests/:id",
    }
  })
})

console.log("wahala");

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`.green);
});
