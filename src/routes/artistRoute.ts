import express from 'express';
import { createArtist, getTrackByArtist } from '../controllers/artistController';

const router = express.Router();

router.post('/artist', createArtist);
router.get('/artist/:artist', getTrackByArtist);

export default router;
