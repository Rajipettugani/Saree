import express from 'express';
import multer from 'multer';
import cloudinary from '../middleware/cloudinary.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protect, adminOnly, upload.array('images', 6), async (req, res) => {
  try {
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
          if (err) reject(err);
          else resolve(result.secure_url);
        });
        stream.end(file.buffer);
      });
    });
    const urls = await Promise.all(uploadPromises);
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
