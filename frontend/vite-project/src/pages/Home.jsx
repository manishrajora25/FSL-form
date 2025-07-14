import React, { useState } from "react";
import axios from "axios"; 
import "./Home.css";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    aadhaar: null,
    aadhaar2: null,
    parentName: "",
    parentPhone: "",
    occupation: "",
    qualification: "",
    year: "",
    college: "",
    course: "",
    source: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.agreed) {
      alert("Please agree to the Terms & Conditions before submitting.");
      return;
    }
  

    

    // Prepare data (convert files to filenames if needed)
    const finalData = {
      ...formData,
      aadhaar: formData.aadhaar?.name || "No file",
      aadhaar2: formData.aadhaar2?.name || "No file",
    };


    setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        aadhaar: null,
        aadhaar2: null,
        parentName: "",
        parentPhone: "",
        occupation: "",
        qualification: "",
        year: "",
        college: "",
        course: "",
        source: "",
        agreed: false,
    })


  
    try {
      const response = await axios.post("http://localhost:3000/api/details/add", finalData);
      console.log("(200) Form submitted:", response.data);
      alert("Form submitted successfully!");
      setFormData="";
    } catch (error) {
      console.error("(500) Submission error:", error);
      alert("Failed to submit form.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-[95%] mx-auto mt-8 space-y-8">
      {/* Personal Details */}
      <div className="p-6 bg-white rounded shadow border">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Details</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" className="flex-1 p-2 border rounded" />
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" className="flex-1 p-2 border rounded" />
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium">Phone</label>
            <input type="Number" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone" className="flex-1 p-2 border rounded" />
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium">Date of Birth</label>
            <input type="Date" name="dob" value={formData.dob} onChange={handleChange} required placeholder="da-mo-year" className="flex-1 p-2 border rounded" />
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-32 font-medium">Gender</label>
            <div className="flex space-x-4">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center space-x-1">
                  <input type="radio" name="gender" value={g} onChange={handleChange} required checked={formData.gender === g} />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-8 items-center">
            <label className="font-medium">Aadhaar Card</label>
            <input type="file" name="aadhaar" onChange={handleChange}  />
            <input type="file" name="aadhaar2" onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Parent / Guardian Details */}
      <div className="border rounded">
        <div className="bg-gray-100 border-b px-4 py-2 font-medium">Parent / Guardian Details</div>
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-48 font-medium">Parent / Guardian Name</label>
            <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} required placeholder="Enter name" className="flex-1 p-2 border rounded" />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-48 font-medium">Parent / Guardian Phone</label>
            <input type="text" name="parentPhone" value={formData.parentPhone} onChange={handleChange} required placeholder="Enter phone" className="flex-1 p-2 border rounded" />
          </div>
        </div>
      </div>

      {/* Educational Details */}
      <div className="border rounded">
        <div className="bg-gray-100 border-b px-4 py-2 font-medium">Educational Details</div>
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-48 font-medium">Are you a:</label>
            <div className="flex space-x-6">
              {["Student", "Working Professional"].map((o) => (
                <label key={o} className="flex items-center space-x-1">
                  <input type="radio" name="occupation" value={o} onChange={handleChange} required checked={formData.occupation === o} />
                  <span>{o}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-48 font-medium">Last Qualification</label>
            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required placeholder="Your qualification" className="flex-1 p-2 border rounded" />
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-48 font-medium">Year</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} required placeholder="Completion year" className="flex-1 p-2 border rounded" />
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-48 font-medium">College / University</label>
            <input type="text" name="college" value={formData.college} onChange={handleChange} required placeholder="Enter college" className="flex-1 p-2 border rounded" />
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="border rounded">
        <div className="bg-gray-100 border-b px-4 py-2 font-medium">Course Details</div>
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-48 font-medium">Course</label>
            <select name="course" value={formData.course} onChange={handleChange} required className="flex-1 p-2 border rounded">
              <option value="">Select course</option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Data Science">Data Science</option>
              <option value="AI / ML">AI / ML</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-48 font-medium">How did you hear about us?</label>
            <div className="flex flex-wrap gap-4">
              {["Google", "LinkedIn", "Instagram", "College TPO", "Friend"].map((src) => (
                <label key={src} className="flex items-center space-x-1">
                  <input type="radio" name="source" value={src} onChange={handleChange} required checked={formData.source === src} />
                  <span>{src}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Register */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} className="h-5 w-5" required />
          <label className="text-sm text-gray-700">
            By clicking submit, you agree to our{" "}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Terms & Conditions
            </a>
          </label>
        </div>
        <button type="submit" className="w-full py-3 rounded text-white font-semibold bg-blue-500 hover:bg-blue-600">
          Register
        </button>
      </div>
    </form>
  );
};

export default Home;
