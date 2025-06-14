const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Using Gmail service directly
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  // This should be your App Password
  },
});

// Verify the connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('Email service error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Future Us" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

module.exports = {
  sendEmail,
}; 