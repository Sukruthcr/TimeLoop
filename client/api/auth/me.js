import dbConnect from '../_lib/dbConnect';
import User from '../_lib/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
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