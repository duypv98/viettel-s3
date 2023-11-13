const multer = require("multer");

const memStorageUpload = multer({ storage: multer.memoryStorage() });

module.exports = {
  memStorageUpload
}