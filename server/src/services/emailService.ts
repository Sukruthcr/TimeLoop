import nodemailer from 'nodemailer';
import type { Document } from 'mongoose';
import { Letter } from '../models/Letter';

interface ILetter {
  email: string;
  subject: string;
  message: string;
  sent: boolean;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendLetter = async (letter: Document & ILetter) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: letter.email,
      subject: letter.subject,
      text: letter.message,
    });

    letter.sent = true;
    await letter.save();
  } catch (error) {
    console.error('Failed to send letter:', error);
    throw error;
  }
}; 