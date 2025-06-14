const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/emailService');

router.post('/test-email', async (req, res) => {
  try {
    await sendEmail(
      'sukruthcr8269@gmail.com',
      'Test Email from Future Us',
      'If you receive this email, your email configuration is working correctly!'
    );
    res.json({ message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 