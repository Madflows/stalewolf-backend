import { Router } from "express";
import { addMusicRequest, getAllRequests, getAllTracks } from "../controllers/musicController.js";

const router = Router();

router.route("/").get(getAllTracks).post(addMusicRequest);


export default router;
