import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
 // Loads .env variables

const app = express();
const port = 3000;

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
}));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(" MongoDB connection error:", err));

// ✅ Schema
const detailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    aadhaar: { type: String },
    aadhaar2: { type: String },
    parentName: { type: String, required: true },
    parentPhone: { type: String, required: true },
    occupation: { type: String, required: true },
    qualification: { type: String, required: true },
    year: { type: String, required: true },
    college: { type: String, required: true },
    course: { type: String, required: true },
    source: { type: String, required: true },
    agreed: { type: Boolean, required: true }
  });
  

const DetailModel = mongoose.model("Details", detailsSchema);

// ✅ Routes

// Create
app.post("/api/details/add", async (req, res) => {
  try {
    const dataToAdd = new DetailModel(req.body);
    await dataToAdd.save();
    console.log("Data Added:", dataToAdd);
    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    console.error(" Error adding data:", error);
    res.status(500).json({ message: "Error adding data", error: error.message });
  }
});

// Read All
app.get("/api/details/get", async (req, res) => {
  try {
    const allData = await DetailModel.find({});
    res.status(200).json(allData);
  } catch (error) {
    console.error(" Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

// Read Single
app.get("/api/details/get/:id", async (req, res) => {
  try {
    const user = await DetailModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
});

// Update
app.put("/api/details/update/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await DetailModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await DetailModel.findByIdAndUpdate(id, updateData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(" Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

// Delete
app.delete("/api/details/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await DetailModel.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(" Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

// ✅ Start Server
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
