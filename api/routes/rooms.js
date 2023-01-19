import express from 'express';
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// TO REMEMBER: I have made a mistake during app creation
// making router.post /hotelid instead of /:hotelid
// it gives error: Cannot POST /api/rooms/63b60af9395b633c7d5f4e3d

// CREATE
router.post('/:hotelid', verifyAdmin, createRoom);
// UPDATE
router.put('/:id', verifyAdmin, updateRoom);
router.put('/availability/:id', updateRoomAvailability);
// DELETE
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);
// GET
router.get('/:id', getRoom);
// GET ALL
router.get('/', getRooms);

export default router;
