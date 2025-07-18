// import express from "express";
// import logMethod from "../middelewares/middeleware.js";
// import { createForm, deleteForm, getAllForms, getFormById } from "../controllers/formController.js";


// const router = express.Router();

// router.post("/add", logMethod, createForm);
// router.get("/get", logMethod, getAllForms);
// router.get("/get/:id", logMethod, getFormById);
// router.delete("/delete/:id", logMethod ,deleteForm);

// export default router;





// import express from "express";
// import logMethod from "../middelewares/middeleware.js";
// // import upload from "../middelewares/multer.js";  
// // import upload from "./middlewares/multer.js";
// import upload from "../middelewares/multerConfig.js";



// import {
//   createForm,
//   deleteForm,
//   getAllForms,
//   getFormById,
// } from "../controllers/formController.js";

// const router = express.Router();

// router.post(
//   "/add",
//   logMethod,
//   upload.fields([
//     { name: "aadhaarFront", maxCount: 1 },
//     { name: "aadhaarBack", maxCount: 1 },
//   ]),
//   createForm
// );

// router.get("/get", logMethod, getAllForms);
// router.get("/get/:id", logMethod, getFormById);
// router.delete("/delete/:id", logMethod, deleteForm);

// export default router;






// import express from "express";
// import { createForm } from "../controllers/formController.js";
// import upload from "../middelewares/multerConfig.js"; // your multer config

// const router = express.Router();

// router.post("/add", upload.fields([
//   { name: "aadhaarFront", maxCount: 1 },
//   { name: "aadhaarBack", maxCount: 1 },
// ]), createForm);

// export default router;



import express from "express";
import uploadMiddleware from "../middelewares/multerConfig.js";
import { createForm } from "../controllers/formController.js";

const router = express.Router();

router.post("/add", createForm); // ✅ Middleware applied here

export default router;
