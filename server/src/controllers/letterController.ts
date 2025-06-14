import { Request, Response } from 'express';
import { Letter } from '../models/Letter';

export const createLetter = async (req: Request, res: Response) => {
  try {
    const letter = new Letter(req.body);
    await letter.save();
    res.status(201).json(letter);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create letter', error });
  }
};

export const getPublicLetters = async (_req: Request, res: Response) => {
  try {
    const letters = await Letter.find({ isPublic: true, sent: false })
      .sort({ deliveryDate: 1 })
      .limit(20);
    res.json(letters);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch public letters', error });
  }
}; 