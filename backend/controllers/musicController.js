import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import {Track} from  "../models/trackModel.js"

// @desc    Get's all tracks
// @route   GET /api/music
// @access  Public
const getAllTracks = asyncHandler(async (req, res) => {
    try {
        const tracks = await Track.find();
        res.status(200).json(tracks);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "There was an error"
        })
    }
});

export {
    getAllTracks,
}
