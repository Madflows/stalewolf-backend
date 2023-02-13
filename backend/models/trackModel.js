import mongoose from 'mongoose';

const trackSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'all songs have a name'],
  },
});

export const Track = mongoose.model('Track', trackSchema);
