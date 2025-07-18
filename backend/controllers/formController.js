// import Form from "../services/formModel.js";

// const createForm = async (req, res) => {
//   try {
//     const { name, email, phone, dob, gender, parentName, parentPhone, localAddress, permanentAddress, occupation, qualification, year, college, designation, company, course, source, friendName, agreed } = req.body;

//     const aadhaarFront = req.files?.aadhaarFront?.[0]?.filename || null;
//     const aadhaarBack = req.files?.aadhaarBack?.[0]?.filename || null;


//     console.log("Front Aadhaar:", aadhaarFront);
//     console.log("Back Aadhaar:", aadhaarBack);


    

//     const newForm = new Form({
//       name, email, phone, dob, gender,
//       parentName, parentPhone,
//       localAddress, permanentAddress,
//       occupation, qualification, year, college,
//       designation, company, course,
//       source, friendName,
//       agreed,
//       aadhaarFront,
//       aadhaarBack
//     });

    

//     const savedForm = await newForm.save();
//     res.status(201).json({ message: "Form submitted successfully", data: savedForm });
//   } catch (error) {
//     console.error("❌ Form submission error:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// };

// export default createForm;



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











// import DetailModel from "../models/DetailModel.js";
// import { v2 as cloudinary } from "cloudinary";
// import multer from "multer";
// const storage = multer.memoryStorage(); 
// const upload = multer({ storage });
// import "dotenv/config";

// cloudinary.config({
//   cloud_name: process.env.CLOUDNAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_SECRET_KEY,
// });

// function uploadToCloudinary(buffer, folder) {
//   console.log("Deepesh");
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder },
//       (err, result) => {
//         if (result) resolve(result);
//         else reject(err);
//       }
//     );
//     stream.end(buffer);
//   });
// }

// export async function addDetails(req, res) {
//   console.log("first");
//   upload.fields([
//     { name: "aadhaarFront", maxCount: 1 },
//     { name: "aadhaarBack", maxCount: 1 },
//   ])(req, res, async (err) => {
//     if (err) {
//       return res
//         .status(400)
//         .json({ message: "File upload error", error: err.message });
//     }
//     const aadhaarFrontFile = req.files?.aadhaarFront?.[0];
//     const aadhaarBackFile = req.files?.aadhaarBack?.[0];
     
//     if (!aadhaarFrontFile || !aadhaarBackFile) {
//       return res
//         .status(400)
//         .json({ message: "Both Aadhar files are required" });
//     }

//     const fileSize = 5 * 1024 * 1024;
//     if (aadhaarFrontFile.size > fileSize || aadhaarBackFile.size > fileSize) {
//       return res
//         .status(400)
//         .json({ message: "Aadhaar images must be under 5MB" });
//     }
//     const { email, ...rest } = req.body;

    // try {
    //   const userExists = await DetailModel.findOne({ email });

    //   if (userExists) {
    //     return res.status(409).json({ message: "Email already register." });
    //   }
    //   console.log("Tanmay");

    //   const [aadhaarFrontImg, aadhaarBackImg] = await Promise.all([
    //     uploadToCloudinary(aadhaarFrontFile.buffer, "aadhaar"),
    //     uploadToCloudinary(aadhaarBackFile.buffer, "aadhaar"),
    //   ]);

//       console.log(aadhaarFrontImg);
//       console.log(aadhaarBackImg);

//       const userData = {
//         email,
//         ...rest,
//         aadhaarFront: aadhaarFrontImg.secure_url,
//         aadhaarBack: aadhaarBackImg.secure_url,
//       };
//       const newUser = new DetailModel(userData);
//       const saveduser = await newUser.save();

//       res.status(201).json({ message: "User register", user: saveduser });
//     } catch (error){
//       console.log("Register Error", err);
//       res.status(500).json({ message: "server error", error: error.message });
//     }
//   });
// }