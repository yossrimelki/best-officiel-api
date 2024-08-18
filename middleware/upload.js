// middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const uploadMiddleware = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      console.log('Only JPEG and PNG files are supported!');
      callback(null, false);
    }
  }
});

// Handle multiple fields
const uploadFields = (fields) => {
  return (req, res, next) => {
    uploadMiddleware.fields(fields)(req, res, next);
  };
};

module.exports = uploadFields;
