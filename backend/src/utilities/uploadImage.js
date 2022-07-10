const multer = require('multer');

const pictures = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: async (req, file, cb) => {
    cb(null, req.id ? req.id : `${file.originalname}`);
  },
});

const uploadImage = multer({ storage: pictures });

module.exports = { uploadImage };
