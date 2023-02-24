import mongoose from 'mongoose';

const requestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'all songs have a name'],
    },
    artist: {
      type: String,
      required: [true, 'Artist name needed'],
    },
    year: {
      type: String,
      required: [true, 'release year needed also'],
    },
    cover: {
      type: String,
      required: [true, 'Sability it is'],
      default:
        'https://i.scdn.co/image/ab67616d00001e0249b34c7489877e5f3267e11a',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    requestedBy: {
      type: String,
      required: true
    },
    isPlayed: {
      type: Boolean,
      default: false,
    },
    requestedOn: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Request = mongoose.model('Request', requestSchema);
