import dbConnect from './_lib/dbConnect';
import ForumPost from './_lib/ForumPost';
import jwt from 'jsonwebtoken';

function authenticateToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) throw new Error('Access denied');
  return jwt.verify(token, process.env.JWT_SECRET);
}

export default async function handler(req, res) {
  await dbConnect();
  try {
    if (req.method === 'POST' && req.url === '/') {
      // Create a forum post
      const user = authenticateToken(req);
      const { title, content, category, tags } = req.body;
      const post = new ForumPost({
        userId: user.userId,
        title,
        content,
        category,
        tags
      });
      await post.save();
      return res.status(201).json(post);
    }
    if (req.method === 'GET' && req.url === '/') {
      // Get all posts with pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const posts = await ForumPost.find()
        .populate('userId', 'username profile.avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const total = await ForumPost.countDocuments();
      return res.json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total
      });
    }
    if (req.method === 'GET' && req.url.startsWith('/category/')) {
      // Get posts by category
      const category = req.url.split('/category/')[1];
      const posts = await ForumPost.find({ category })
        .populate('userId', 'username profile.avatar')
        .sort({ createdAt: -1 });
      return res.json(posts);
    }
    if (req.method === 'POST' && req.url.match(/^\/[a-fA-F0-9]{24}\/comments$/)) {
      // Add comment to post
      const user = authenticateToken(req);
      const postId = req.url.split('/')[1];
      const { content } = req.body;
      const post = await ForumPost.findByIdAndUpdate(
        postId,
        { $push: { comments: { userId: user.userId, content } } },
        { new: true }
      ).populate('comments.userId', 'username profile.avatar');
      return res.json(post);
    }
    if (req.method === 'POST' && req.url.match(/^\/[a-fA-F0-9]{24}\/like$/)) {
      // Like/unlike post
      const user = authenticateToken(req);
      const postId = req.url.split('/')[1];
      const post = await ForumPost.findById(postId);
      const userLikeIndex = post.likes.indexOf(user.userId);
      if (userLikeIndex === -1) {
        post.likes.push(user.userId);
      } else {
        post.likes.splice(userLikeIndex, 1);
      }
      await post.save();
      return res.json(post);
    }
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
} 