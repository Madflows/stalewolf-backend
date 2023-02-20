import { Router } from "express";
import { addMusicRequest, deleteARequest, getAllRequests } from "../controllers/requestController.js";

const router = Router();

router.route('/').get(getAllRequests).post(addMusicRequest);
router.route('/:id').delete(deleteARequest);

export default router
