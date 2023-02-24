import { Router } from "express";
import { addMusicRequest, getAllRequests, getMyRequests, updateRequest } from "../controllers/requestController.js";

const router = Router();

router.route('/').get(getAllRequests).post(addMusicRequest);
router.route('/:id').put(updateRequest);
router.route('/me').get(getMyRequests);

export default router
