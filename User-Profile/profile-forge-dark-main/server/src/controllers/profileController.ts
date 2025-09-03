import { Request, Response } from 'express';
import { Profile } from '../models/Profile';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};