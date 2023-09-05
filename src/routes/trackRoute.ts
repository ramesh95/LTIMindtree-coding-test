import express from 'express';
import {getTrackByIsrc, createTrack } from '../controllers/trackController';

const router = express.Router();

// Define routes
router.get('/track/:isrc', getTrackByIsrc);
router.post('/tracks', createTrack);

// Add other routes as needed

export default router;
