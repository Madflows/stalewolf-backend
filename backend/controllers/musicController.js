import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { Track } from '../models/trackModel.js';
import axios from 'axios';
import dotenv from 'dotenv';
import { searchSpotify } from '../utils/functions.js';

dotenv.config();

let CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
let CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
// @desc    Get's all tracks
// @route   GET /api/music
// @access  Public
const getAllTracks = asyncHandler(async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'There was an error',
    });
  }
});

const getCustomTrack = asyncHandler(async (req, res) => {
  try {
    let accessToken;
    axios
      .post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials&client_id=' +
          CLIENT_ID +
          '&client_secret=' +
          CLIENT_SECRET,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((response) => {
          let accessToken = response.data.access_token;
          searchSpotify(accessToken, req.params.track).then((result) => {
            res.status(200).json(result);
          })
          
      })
      .catch((err) => {
        res.status(500).json({
            error: err
        })
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Track not found',
    });
  }
});

export { getAllTracks, getCustomTrack };
