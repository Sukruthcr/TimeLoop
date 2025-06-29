import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['motivation', 'success', 'life', 'future', 'dreams'],
    default: 'motivation'
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.models.Quote || mongoose.model('Quote', quoteSchema); 