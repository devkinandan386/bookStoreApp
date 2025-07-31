const multer = require("multer");

const storage = multer.memoryStorage(); // Store image in memory (convert to Base64)
const upload = multer({ storage });

module.exports = upload;
