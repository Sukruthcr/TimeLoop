import dbConnect from './_lib/dbConnect';
import Letter from './_lib/Letter';
import { sendEmail } from './_lib/emailService';
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
    if (req.method === 'POST') {
      // Create a new letter (no file upload)
      const user = authenticateToken(req);
      const { subject, message, deliveryDate, isPublic, email } = req.body;
      const letter = new Letter({
        userId: user.userId,
        subject,
        message,
        deliveryDate: new Date(deliveryDate),
        isPublic: isPublic || false,
        email: email || user.email,
        isDelivered: false,
        attachments: []
      });
      await letter.save();
      try {
        await sendEmail(
          email || user.email,
          'Letter Scheduled Successfully',
          `Your letter "${subject}" has been scheduled for delivery on ${new Date(deliveryDate).toLocaleDateString()}`
        );
      } catch (emailError) {
        // Don't fail the request if email fails
      }
      return res.status(201).json({
        message: 'Letter created successfully',
        letter: {
          id: letter._id,
          subject: letter.subject,
          deliveryDate: letter.deliveryDate,
          isPublic: letter.isPublic
        }
      });
    }
    if (req.method === 'GET' && req.url === '/public') {
      // Get all public letters
      const user = authenticateToken(req);
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
      return res.json(formattedLetters);
    }
    if (req.method === 'GET' && req.url === '/my') {
      // Get user's letters with countdown
      const user = authenticateToken(req);
      const letters = await Letter.find({ userId: user.userId })
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
      return res.json(lettersWithCountdown);
    }
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
} 