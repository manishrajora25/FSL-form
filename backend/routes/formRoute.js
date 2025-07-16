import express from "express";
import { createForm, deleteForm, getAllForms, getFormById } from "../controllers/formController.js";


const router = express.Router();

router.post("/add", createForm);
router.get("/get", getAllForms);
router.get("/get/:id", getFormById);
router.delete("/delete/:id", deleteForm);

export default router;
