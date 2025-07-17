import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Required for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // Upload folder path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

// Multer Instance with Fields
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB per file
});

// Export middleware for fields: aadhaarFront & aadhaarBack
const uploadMiddleware = upload.fields([
  { name: "aadhaarFront", maxCount: 1 },
  { name: "aadhaarBack", maxCount: 1 }
]);

export default uploadMiddleware;
