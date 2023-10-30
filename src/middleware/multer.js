import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname /*+ '_' + Date.now() */ + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})



// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//       fileSize: 25 * 1024 * 1024, // 25 MB
//       files: 1,
//   },
// })

module.exports = { upload }

// const multer = require("multer");
// const path = require("path");

// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });