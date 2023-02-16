import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"

const getAllRequests = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Hello from user",
  });
});

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
    addMusicRequest
}
