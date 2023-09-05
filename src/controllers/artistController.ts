import { Request, Response } from 'express';
import { Artist } from '../models/artistModel';

// export const getAllUsers = async (req: Request, res: Response) => {
//     console.log("Hello jssssss finnnnn")
//   try {
//     const users = await Track.findAll();
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const getUserById = async (req: Request, res: Response) => {
//   const userId = req.params.id;

//   try {
//     const user = await Track.findByPk(userId);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const createArtist = async (req, res) => {
    try {
      const artist = await Artist.create(req.body);
  
      if (artist) {
        res.json(artist);
      } else {
        res.status(404).json({ error: 'artist not found' });
      }
    } catch (error) {
      console.error('Error creating artist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  