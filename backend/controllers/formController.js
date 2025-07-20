import dataModel from "../services/formModel.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
      if (result) resolve(result);
      else reject(err);
    });
    stream.end(buffer);
  });
}

export async function createForm(req, res) {
  console.log("first");

  upload.fields([
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File Upload Error", error: err.message });
    }

    const aadhaarFrontFile = req.files?.aadhaarFront?.[0];
    const aadhaarBackFile = req.files?.aadhaarBack?.[0];

    if (!aadhaarFrontFile || !aadhaarBackFile) {
      return res.status(400).json({ message: "Both Aadhaar files are required" });
    }

    const fileSize = 5 * 1024 * 1024;
    if (aadhaarFrontFile.size > fileSize || aadhaarBackFile.size > fileSize) {
      return res.status(400).json({ message: "Aadhaar images must be under 5MB" });
    }

    const { email, ...rest } = req.body;

    try {
      const userExists = await dataModel.findOne({ email });
      if (userExists) {
        return res.status(409).json({ message: "Email already registered." });
      }

      const [aadhaarFrontImg, aadhaarBackImg] = await Promise.all([
        uploadCloudinary(aadhaarFrontFile.buffer, "aadhaar"),
        uploadCloudinary(aadhaarBackFile.buffer, "aadhaar"),
      ]);

      const userData = {
        email,
        ...rest,
        aadhaarFront: aadhaarFrontImg.secure_url,
        aadhaarBack: aadhaarBackImg.secure_url,
      };

      const newUser = new dataModel(userData);
      const savedUser = await newUser.save();

      res.status(201).json({ message: "User registered", user: savedUser });
    } catch (error) {
      console.log("Register Error", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
}










