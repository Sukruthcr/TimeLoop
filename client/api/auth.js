import dbConnect from './_lib/dbConnect';
import User from './_lib/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST' && req.url === '/signup') {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({
          error: existingUser.email === email ? 'Email already registered' : 'Username already taken'
        });
      }
      const user = new User({ username, email, password });
      await user.save();
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ error: 'Failed to create account' });
    }
  }

  if (req.method === 'POST' && req.url === '/signin') {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Signin error:', error);
      return res.status(500).json({ error: 'Failed to sign in' });
    }
  }

  if (req.method === 'GET' && req.url === '/me') {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'Access denied' });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.json({ user: {
        id: user._id,
        username: user.username,
        email: user.email
      }});
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
} 