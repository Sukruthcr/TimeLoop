import mongoose from 'mongoose';

const letterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deliveredAt: {
    type: Date
  },
  attachments: [{
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    caption: String
  }],
  theme: {
    type: String,
    enum: ['default', 'vintage', 'modern', 'minimalist', 'colorful'],
    default: 'default'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  socialShares: {
    facebook: { type: Number, default: 0 },
    twitter: { type: Number, default: 0 },
    instagram: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

export default mongoose.models.Letter || mongoose.model('Letter', letterSchema); 