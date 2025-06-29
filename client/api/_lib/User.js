import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    avatar: String,
    bio: String,
    location: String,
    socialLinks: {
      facebook: String,
      twitter: String,
      instagram: String
    }
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    emailNotifications: {
      letterReminders: { type: Boolean, default: true },
      newComments: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: true }
    },
    privacySettings: {
      showProfile: { type: Boolean, default: true },
      showLetters: { type: Boolean, default: true }
    }
  },
  stats: {
    totalLetters: { type: Number, default: 0 },
    publicLetters: { type: Number, default: 0 },
    receivedLetters: { type: Number, default: 0 }
  },
  badges: [{
    name: String,
    description: String,
    earnedAt: Date
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema); 