import { Request, Response } from 'express';
import { Artist } from '../models/artistModel';
import { Track } from '../models/trackModel';
import { Op } from 'sequelize';

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

export const getTrackByArtist = async (req: Request, res: Response) => {
    const artist = req.params.artist;
    try {
        const result = await Track.findAll({
            include: [
              {
                model: Artist,
                where: {
                  artistName: {
                    [Op.like]: `%${artist}%`,
                  },
                },
                as: 'artists',
              },
            ],
          });
          
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'Tracks not found for the artist' });
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  