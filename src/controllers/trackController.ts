import { Request, Response } from 'express';
import { Track } from '../models/trackModel';
import { Artist } from '../models/artistModel';
import { Op } from 'sequelize';
import SpotifyService from '../services/SpotifyService';

export const getAllUsers = async (req: Request, res: Response) => {
    console.log("Hello jssssss finnnnn")
  try {
    const users = await Track.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTrackByIsrc = async (req: Request, res: Response) => {
  const isrc = req.params.isrc;
  try {
    const track = await Track.findAll({
      where: {
        isrc: {
          [Op.like]: `%${isrc}%`, // Use the LIKE operator with wildcards
        },
      },
    });
    if (track) {
      res.json(track);
    } else {
      res.status(404).json({ error: 'Track not found' });
    } 
  } catch (error) {
    console.error('Error fetching track:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createTrack = async (req, res) => {
  const result = await SpotifyService.fetchTrackByISRC(req.body.isrc, req.body.skip, req.body.limit);
    try {
      const isrc = req.body.isrc
      const trackBody = {
          trackID: result.id,
          trackName: result.name,
          isrc: isrc,
          duration: result.duration_ms,
          popularity: result.popularity
      };
      const track = await Track.create(trackBody);

     
      for (let index = 0; index < result.artists.length; index++) {
        const artistBody = {
          artistID : result.artists[index].id,
          trackID: result.id,
          artistName: result.artists[index].name
      };
      await Artist.create(artistBody);
      
      }  
      if (track) {
        res.json(track);
      } else {
        res.status(404).json({ error: 'track not found' });
      }
    } catch (error) {
      console.error('Error creating track:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  