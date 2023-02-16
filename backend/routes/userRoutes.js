import { Router } from "express";
import { addMusicRequest, getAllRequests } from "../controllers/musicController.js";

const router = Router();

router.route("/").get(getAllRequests).post(addMusicRequest);


export default router;
