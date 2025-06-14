const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL.USER,
    pass: config.EMAIL.PASS
  }
});

// Verify the connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('Email service error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: `"Future Us" <${config.EMAIL.USER}>`,
      to,
      subject,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendEmail
}; 