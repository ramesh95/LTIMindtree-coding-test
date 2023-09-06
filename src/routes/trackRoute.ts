import express from 'express';
import {getTrackByIsrc, createTrack } from '../controllers/trackController';

const router = express.Router();

router.get('/track/:isrc', getTrackByIsrc);
router.post('/tracks', createTrack);

export default router;
