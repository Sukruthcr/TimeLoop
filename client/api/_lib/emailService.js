import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: `"Future Us" <${EMAIL_USER}>`,
    to,
    subject,
    text,
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
} 