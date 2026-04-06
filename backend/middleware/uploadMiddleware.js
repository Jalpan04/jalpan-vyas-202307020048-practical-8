const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'),
        false
      );
    }
  },
});

module.exports = upload;
