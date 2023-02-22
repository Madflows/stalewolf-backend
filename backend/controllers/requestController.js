import asyncHandler from 'express-async-handler';
import { Request } from '../models/requestModel.js';

// Function to get difference in minutes between two date
function diff_minutes(dt1) {
  var diff = (new Date().getTime() - dt1) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

// @desc    Get's all requests
// @route   GET /api/requests
// @access  Public

const getAllRequests = asyncHandler(async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: 1 });
    res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'There was an error',
    });
  }
});

const addMusicRequest = asyncHandler(async (req, res) => {
  const { name, cover, year, artist } = req.body;
  const date = new Date().getTime();

  let isBlocked =
    req.headers.cookie && req.headers.cookie.includes('block-request');

  if (!name || !cover || !year || !artist) {
    res.status(500).json({
      message: 'Provide the name and cover-url of the song',
    });
  }

  const requestExists = await Request.findOne({ name });
  if (requestExists && diff_minutes(requestExists.requestedOn) < 30) {
    res.status(500).json({
      message:
        'Requested less than 30 Minutes ago',
    });
  }

  if (!isBlocked) {
    
    const request = await Request.create({
      name,
      cover,
      year,
      artist,
      requestedOn: date,
    });
    res.cookie('block-request', true, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
      secure: true,
    });
    res.status(200).json(request);
    
  }
  if (isBlocked) {

    res.status(400).json({
      message: 'Chill with the requests',
    });
  }
});

const deleteARequest = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const idExists = Request.findById(id);
  if (!idExists) {
    res.status(400).json({
      message: 'We need an id params to delete a request',
    });
  }
  const requests = await Request.findByIdAndDelete(id);
  res.status(200).json(requests);
});

export { getAllRequests, addMusicRequest, deleteARequest };
