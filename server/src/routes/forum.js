const express = require('express');
const ForumPost = require('../models/ForumPost');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a forum post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const post = new ForumPost({
      userId: req.user.userId,
      title,
      content,
      category,
      tags
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Get all posts with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await ForumPost.find()
      .populate('userId', 'username profile.avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ForumPost.countDocuments();

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get posts by category
router.get('/category/:category', async (req, res) => {
  try {
    const posts = await ForumPost.find({ category: req.params.category })
      .populate('userId', 'username profile.avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Add comment to post
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await ForumPost.findByIdAndUpdate(
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
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Like/unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    const userLikeIndex = post.likes.indexOf(req.user.userId);

    if (userLikeIndex === -1) {
      post.likes.push(req.user.userId);
    } else {
      post.likes.splice(userLikeIndex, 1);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update like' });
  }
});

module.exports = router; 