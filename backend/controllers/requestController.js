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
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'There was an error',
    });
  }
});

const addMusicRequest = asyncHandler(async (req, res) => {
  const { name, cover } = req.body;
  const date = new Date().getTime();

  let diff = 0;

  let last_requested = req.cookies.last_requested;

  if (!name || !cover) {
    res.status(500).json({
      message: 'Provide the name and cover-url of the song',
    });
  }

  const requestExists = await Request.findOne({ name });
  if (requestExists && diff_minutes(requestExists.requestedOn) < 30) {
    res.status(500).json({
      message:
        'The requested song has already been requested within the last 30min',
    });
  }

  if (!last_requested) {
    res.cookie('last_requested', date, {
      httpOnly: true,
      secure: true,
    });
    const request = await Request.create({
      name,
      cover,
      requestedOn: date,
    });

    res.status(200).json(request);
  } else {
    diff = diff_minutes(last_requested);

    if (diff >= 5) {
      const request = await Request.create({
        name,
        cover,
        requestedOn: date,
      });

      res.status(200).json(request);
    } else {
      res.status(400).json({
        message: 'Come on man, you have to wait...',
      });
    }
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
