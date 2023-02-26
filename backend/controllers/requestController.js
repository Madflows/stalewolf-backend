import asyncHandler from 'express-async-handler';
import { Request } from '../models/requestModel.js';
import { v4 as uuidv4 } from 'uuid';

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
    const requests = await Request.find({ isPlayed: false, isAvailable: true }).sort({
      createdAt: 1,
    });
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
  const { userId } = req.cookies;
  const randomId = uuidv4();
  const requestExists = await Request.findOne({ name });
  let isBlocked =
    req.headers.cookie && req.headers.cookie.includes('block-request');

  if (!name || !cover || !year || !artist) {
    res.status(500).json({
      message: 'Please provide the name, cover-url, year and artist field',
    });
  }

  if (!userId) {
    res.cookie('userId', randomId, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }
  if (requestExists && diff_minutes(requestExists.requestedOn) < 30) {
    res.status(500).json({
      message: 'Requested less than 30 Minutes ago',
    });
  }
  if (!isBlocked && !requestExists) {
    const request = await Request.create({
      name,
      cover,
      year,
      artist,
      requestedOn: date,
      requestedBy: userId || randomId,
    });
    res.cookie('block-request', true, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.status(200).json(request);
  }
  if (isBlocked) {
    res.status(400).json({
      message: 'Slow down there, partner!',
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

const getMyRequests = asyncHandler(async (req, res) => {
  const userId = req.cookies['userId'];

  if (!userId) {
    res.status(200).json([]);
  }
  const allMyRequest = await Request.find({ requestedBy: userId }).sort({
    createdAt: -1,
  });

  res.status(200).json(allMyRequest);
});

// @desc    Update a request
// @route   PUT /api/requests/:id
// @access  Private
const updateRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) {
    res.status(400);
    throw new Error(`Request with ID ${req.params.id} not found`);
  }

  const updatedRequest = await Request.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedRequest);
});

export { getAllRequests, addMusicRequest, deleteARequest, getMyRequests, updateRequest };
