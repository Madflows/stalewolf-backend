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
            error: "There was an error"
        })
    }
});

// @desc    Get's all requests
// @route   GET /api/requests
// @access  Public

const getAllRequests = asyncHandler( async (req, res) => {
    // Empty
} )

const addMusicRequest = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const date = new Date();
  
  if (!name) {
    res.status(400).json({
        "message": "We need a music, wth"
    })
  }
  

  if (!req.cookies?.last_requested) {
    res.cookie("last_requested", date, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      message: `${name} added to requests`,
    });
  } else {
    res.status(400).json({
        message: "Come on man, you have to wait..."
    })
  }
  

  
})


export {
    getAllRequests,
    getAllTracks,
    addMusicRequest
}
