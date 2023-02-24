import { Router } from "express";
import { addMusicRequest, deleteARequest, getAllRequests, getMyRequests } from "../controllers/requestController.js";

const router = Router();

router.route('/').get(getAllRequests).post(addMusicRequest);
router.route('/:id').delete(deleteARequest);
router.route('/me').get(getMyRequests);

export default router
