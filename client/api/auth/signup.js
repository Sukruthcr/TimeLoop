import dbConnect from '../_lib/dbConnect';
import User from '../_lib/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
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