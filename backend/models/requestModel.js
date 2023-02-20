import mongoose from 'mongoose';

const requestSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'all songs have a name'],
  },
  cover: {
    type: String,
    required: [true, 'Sability it is'],
    default: 'https://i.scdn.co/image/ab67616d00001e0249b34c7489877e5f3267e11a',
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isPlayed: {
    type: Boolean,
    default: false,
  },
  requestedOn: {
    type: Number,
  },
});

export const Request = mongoose.model('Request', requestSchema);
