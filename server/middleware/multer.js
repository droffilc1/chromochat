const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinary');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.webp') {
    cb(new Error('File type is not supported'), false);
    return;
  }
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });
