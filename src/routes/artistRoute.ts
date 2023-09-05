import express from 'express';
import { createArtist } from '../controllers/artistController';
// import { getAllUsers, getUserById, createArtist } from '../controllers/artistController';

const router = express.Router();

router.post('/artist', createArtist);

export default router;
