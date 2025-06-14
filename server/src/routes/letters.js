const express = require('express');
const Letter = require('../models/Letter');
const { sendEmail } = require('../services/emailService');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images and videos are allowed!'));
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Create a new letter with attachments
router.post('/', authenticateToken, upload.array('attachments', 5), async (req, res) => {
  try {
    const { subject, message, deliveryDate, isPublic, email } = req.body;
    
    const attachments = req.files ? req.files.map(file => ({
      type: file.mimetype.startsWith('image/') ? 'image' : 'video',
      url: file.path,
      caption: ''
    })) : [];

    const letter = new Letter({
      userId: req.user.userId,
      subject,
      message,
      deliveryDate: new Date(deliveryDate),
      isPublic: isPublic || false,
      email: email || req.user.email,
      isDelivered: false,
      attachments
    });

    await letter.save();

    // Send confirmation email if email service is configured
    try {
      await sendEmail(
        email || req.user.email,
        'Letter Scheduled Successfully',
        `Your letter "${subject}" has been scheduled for delivery on ${new Date(deliveryDate).toLocaleDateString()}`
      );
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Letter created successfully',
      letter: {
        id: letter._id,
        subject: letter.subject,
        deliveryDate: letter.deliveryDate,
        isPublic: letter.isPublic
      }
    });
  } catch (error) {
    console.error('Error creating letter:', error);
    res.status(500).json({ 
      error: 'Failed to create letter',
      details: error.message 
    });
  }
});

// Get all public letters with social features
router.get('/public', authenticateToken, async (req, res) => {
  try {
    const letters = await Letter.find({ isPublic: true })
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .limit(10);

    const formattedLetters = letters.map(letter => ({
      id: letter._id,
      subject: letter.subject,
      message: letter.message,
      author: letter.userId.username || 'Anonymous',
      createdAt: letter.createdAt,
      deliveryDate: letter.deliveryDate
    }));

    res.json(formattedLetters);
  } catch (error) {
    console.error('Error fetching public letters:', error);
    res.status(500).json({ error: 'Failed to fetch public letters' });
  }
});

// Get user's letters with countdown
router.get('/my', authenticateToken, async (req, res) => {
  try {
    const letters = await Letter.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    const lettersWithCountdown = letters.map(letter => {
      const now = new Date();
      const delivery = new Date(letter.deliveryDate);
      const timeLeft = delivery - now;
      return {
        ...letter.toObject(),
        countdown: {
          days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
        }
      };
    });

    res.json(lettersWithCountdown);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your letters' });
  }
});

// Like/unlike a letter
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const letter = await Letter.findById(req.params.id);
    const userLikeIndex = letter.likes.indexOf(req.user.userId);

    if (userLikeIndex === -1) {
      letter.likes.push(req.user.userId);
    } else {
      letter.likes.splice(userLikeIndex, 1);
    }

    await letter.save();
    res.json(letter);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update like' });
  }
});

// Add comment to letter
router.post('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    const letter = await Letter.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            userId: req.user.userId,
            content
          }
        }
      },
      { new: true }
    ).populate('comments.userId', 'username profile.avatar');
    res.json(letter);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Update social share count
router.post('/:id/share', authenticateToken, async (req, res) => {
  try {
    const { platform } = req.body;
    const update = {};
    update[`socialShares.${platform}`] = 1;

    const letter = await Letter.findByIdAndUpdate(
      req.params.id,
      { $inc: update },
      { new: true }
    );
    res.json(letter);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update share count' });
  }
});

module.exports = router; 