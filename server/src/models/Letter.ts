import mongoose from 'mongoose';

const letterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    maxLength: 100,
  },
  message: {
    type: String,
    required: true,
    minLength: 10,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  sent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Letter = mongoose.model('Letter', letterSchema); 