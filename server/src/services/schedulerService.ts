import cron from 'node-cron';
import { Letter } from '../models/Letter';
import { sendLetter } from './emailService';

export const startScheduler = () => {
  // Check for letters to send every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const letters = await Letter.find({
        deliveryDate: { $lte: now },
        sent: false,
      });

      for (const letter of letters) {
        try {
          await sendLetter(letter);
          console.log(`Successfully sent letter to ${letter.email}`);
        } catch (error) {
          console.error(`Failed to send letter to ${letter.email}:`, error);
        }
      }
    } catch (error) {
      console.error('Scheduler error:', error);
    }
  });
}; 