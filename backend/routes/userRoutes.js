import { Router } from "express";
import {getAllTracks } from "../controllers/musicController.js";

const router = Router();

router.route("/").get(getAllTracks);


export default router;
