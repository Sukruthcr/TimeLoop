const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/emailService');

router.post('/test-email', async (req, res) => {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER, // Send to yourself as a test
      subject: 'Test Email from Future Us',
      text: 'If you receive this email, your email configuration is working!',
      html: '<h1>Email Test</h1><p>If you receive this email, your email configuration is working!</p>'
    });

    res.json({ message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 