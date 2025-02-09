// this file act as the middleware for the upload handling
//
const multer = require("multer");

const AppError = require("../utils/AppError");

const storage = multer.memoryStorage();
const upload = multer({
  storege: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
  fileFilter: (req, file, callback) => {
    if (file.fieldname === "audio") {
      if (file.mimetype.startsWith("audio/")) {
        callback(null, true);
      } else {
        callback(new AppError("Invalid audio file type", 415));
      }
    } else if (file.fieldname === "image") {
      if (file.mimetype.startsWith("image/")) {
        callback(null, true);
      } else {
        callback(new AppError("Invalid image file type", 415));
      }
    } else {
      callback(new AppError("Unexpected field", 415));
    }
  },
});

module.exports = upload;
