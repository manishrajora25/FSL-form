import FormModel from "../services/formModel.js";

// POST /api/details/add
export const createForm = async (req, res) => {
  console.log("first");
  try {
    const form = new FormModel(req.body);
    await form.save();
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Form submission error:", error);
    res
      .status(500)
      .json({ message: "Form submission failed", error: error.message });
  }
};

// GET /api/details/get
export const getAllForms = async (req, res) => {
  try {
    const forms = await FormModel.find();
    res.status(200).json(forms);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching forms", error: error.message });
  }
};

// GET /api/details/get/:id
export const getFormById = async (req, res) => {
  try {
    const form = await FormModel.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.status(200).json(form);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching form", error: error.message });
  }
};

// DELETE /api/details/delete/:id
export const deleteForm = async (req, res) => {
  try {
    const form = await FormModel.findByIdAndDelete(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting form", error: error.message });
  }
};
