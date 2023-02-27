import { Router } from "express";
import {getAllTracks, getCustomTrack } from "../controllers/musicController.js";

const router = Router();

router.route("/").get(getAllTracks);
router.route("/:track").get(getCustomTrack);


export default router;
