import express from 'express';
const router = express.Router();
import { getSongs, getSong, updateSong, deleteSong, addSong } from '../controllers/songs';

router.get('/songs', getSongs);
router.get('/songs/:title', getSong);
router.put('/songs/:id', updateSong);
router.delete('/songs/:id', deleteSong);
router.post('/songs', addSong);

export default router;
