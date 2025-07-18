import React, { useState } from "react";
import axios from "axios"; 
import  {instance}  from "../axiosConfig"; 
import "./Home.css";

const Home = () => {
  const [aadhaarFront, setAadhaarFrontFile] = useState(null);
const [aadhaarBack, setAadhaarBackFile] = useState(null);


const [aadharPreview, setAadharPreview] = useState({
  front: "",
  back: "",
});




  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    aadhaarFront: null,
    aadhaarBack: null,
    parentName: "",
    parentPhone: "",
    localAddress: "",
    sameAsLocal: false,
    permanentAddress: "",
    occupation: "Student",
    qualification: "",
    year: "",
    college: "",
    designation: "",
    company: "",
    course: "",
    source: "",
    friendName:"",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] })); // file ek hi hai
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const data = new FormData(); // ✅ Rename to avoid conflict
  
      // Append all fields from form state
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("dob", formData.dob);
      data.append("gender", formData.gender);
  
      // ✅ Check if aadhaar files are present
      if (formData.aadhaarFront) {
        data.append("aadhaarFront", formData.aadhaarFront);
      }
  
      if (formData.aadhaarBack) {
        data.append("aadhaarBack", formData.aadhaarBack);
      }
  
      data.append("parentName", formData.parentName);
      data.append("parentPhone", formData.parentPhone);
      data.append("localAddress", formData.localAddress);
      data.append("sameAsLocal", formData.sameAsLocal);
      data.append("permanentAddress", formData.permanentAddress);
      data.append("occupation", formData.occupation);
  
      // Conditional Fields
      if (formData.occupation === "Student") {
        data.append("qualification", formData.qualification);
        data.append("year", formData.year);
        data.append("college", formData.college);
      } else {
        data.append("designation", formData.designation);
        data.append("company", formData.company);
      }
  
      data.append("course", formData.course);
      data.append("source", formData.source);
      data.append("friendName", formData.friendName);
      data.append("agreed", formData.agreed);
  
      // Send POST request
      const response = await instance.post("/api/details/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Form submitted successfully!");
      console.log("Success:", response.data);
  
      // Reset form state
      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        aadhaarFront: null,
        aadhaarBack: null,
        parentName: "",
        parentPhone: "",
        localAddress: "",
        sameAsLocal: false,
        permanentAddress: "",
        occupation: "Student",
        qualification: "",
        year: "",
        college: "",
        designation: "",
        company: "",
        course: "",
        source: "",
        friendName: "",
        agreed: false,
      });
  
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-[95%] mx-auto mt-[10%] space-y-8">
  {/* Personal Details */}
  <div className="p-4 sm:p-6 mt-[10%]  bg-white rounded shadow border">
    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Details</h2>
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <label className="sm:w-32 font-medium">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" className="flex-1 p-2 border rounded w-full" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <label className="sm:w-32 font-medium">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" className="flex-1 p-2 border rounded w-full" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <label className="sm:w-32 font-medium">Phone</label>
        <input type="number" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone" className="flex-1 p-2 border rounded w-full" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <label className="sm:w-32 font-medium">Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="flex-1 p-2 border rounded w-full" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <label className="sm:w-32 font-medium">Gender</label>
        <div className="flex space-x-4">
          {["Male", "Female", "Other"].map((g) => (
            <label key={g} className="flex items-center space-x-1">
              <input type="radio" name="gender" value={g} onChange={handleChange} required checked={formData.gender === g} />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
  <label className="sm:w-32 font-medium">Aadhaar Card</label>
  <div className="flex flex-col sm:flex-row gap-3 w-full">
    <input
      type="file"
      accept="image/*"
      name="aadhaarFront"
      onChange={(e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, aadhaarFront: file }));
        if (file) {
          setAadharPreview((prev) => ({
            ...prev,
            front: URL.createObjectURL(file),
          }));
        }
      }}
      className="bg-gray-500 p-[5px] w-full sm:w-[200px] text-white border rounded"
    />
    <input
      type="file"
      accept="image/*"
      name="aadhaarBack"
      onChange={(e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, aadhaarBack: file }));
        if (file) {
          setAadharPreview((prev) => ({
            ...prev,
            back: URL.createObjectURL(file),
          }));
        }
      }}
      className="bg-gray-500 p-[5px] w-full sm:w-[200px] text-white border rounded"
    />
  </div>
</div>

{/* ✅ Preview Aadhaar Images Below */}
<div className="flex gap-4 mt-3">
  {aadharPreview.front && (
    <div>
      <p className="text-sm font-medium">Front Preview:</p>
      <img
        src={aadharPreview.front}
        alt="Aadhaar Front"
        className="w-[200px] h-auto border rounded"
      />
    </div>
  )}
  {aadharPreview.back && (
    <div>
      <p className="text-sm font-medium">Back Preview:</p>
      <img
        src={aadharPreview.back}
        alt="Aadhaar Back"
        className="w-[200px] h-auto border rounded"
      />
    </div>
  )}
</div>

    </div>
  </div>

  {/* Parent / Guardian Details */}
  <div className="border rounded">
    <div className="bg-gray-100 border-b px-4 py-2 font-medium">Parent / Guardian Details</div>
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <label className="sm:w-48 font-medium">Parent / Guardian Name</label>
        <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} required placeholder="Enter name" className="flex-1 p-2 border rounded w-full" />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <label className="sm:w-48 font-medium">Parent / Guardian Phone</label>
        <input type="text" name="parentPhone" value={formData.parentPhone} onChange={handleChange} required placeholder="Enter phone" className="flex-1 p-2 border rounded w-full" />
      </div>
    </div>
  </div>

  {/* Residential Details */}
  <div className="border rounded">
    <div className="bg-gray-100 border-b px-4 py-2 font-medium">Residential Details</div>
    <div className="p-4 space-y-4">
      <div className="flex flex-col">
        <label className="font-medium mb-1">Local Address</label>
        <textarea name="localAddress" value={formData.localAddress} onChange={(e) => {
          handleChange(e);
          if (formData.sameAsLocal) {
            setFormData((prev) => ({
              ...prev,
              permanentAddress: e.target.value
            }));
          }
        }} placeholder="Enter your local address (Where you stay in jaipur)" className="p-2 border rounded w-full" />
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" name="sameAsLocal" checked={formData.sameAsLocal} onChange={(e) => {
          const checked = e.target.checked;
          setFormData((prev) => ({
            ...prev,
            sameAsLocal: checked,
            permanentAddress: checked ? prev.localAddress : ""
          }));
        }} className="h-5 w-5" />
        <label className="text-sm">Permanent address is the same as local address</label>
      </div>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Permanent Address</label>
        <textarea name="permanentAddress" value={formData.permanentAddress} readOnly onChange={handleChange} disabled={formData.sameAsLocal} placeholder="Enter your permanent address (address of your hometown)" className="p-2 border rounded w-full bg-white disabled:bg-gray-100" />
      </div>
    </div>
  </div>

  {/* Educational Details */}
  <div className="border rounded">
    <div className="bg-gray-100 border-b px-4 py-2 font-medium">Educational Details</div>
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <label className="sm:w-48 font-medium">Are you a:</label>
        <div className="flex space-x-4">
          {["Student", "Working Professional"].map((o) => (
            <label key={o} className="flex items-center space-x-1">
              <input type="radio" name="occupation" value={o} onChange={handleChange} checked={formData.occupation === o} required />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </div>

      {formData.occupation === "Student" && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="sm:w-48 font-medium">Last Attained Qualification</label>
            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Enter your qualification" className="flex-1 p-2 border rounded w-full" required />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="sm:w-48 font-medium">Year</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Enter your completion year" className="flex-1 p-2 border rounded w-full" required />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="sm:w-48 font-medium">College / University</label>
            <input type="text" name="college" value={formData.college} onChange={handleChange} placeholder="College / University" className="flex-1 p-2 border rounded w-full" required />
          </div>
        </>
      )}

      {formData.occupation === "Working Professional" && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="sm:w-48 font-medium">Designation</label>
            <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Enter your designation" className="flex-1 p-2 border rounded w-full" required />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="sm:w-48 font-medium">Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Enter your company name" className="flex-1 p-2 border rounded w-full" required />
          </div>
        </>
      )}
    </div>
  </div>

  {/* Course Details */}
  <div className="border rounded">
    <div className="bg-gray-100 border-b px-4 py-2 font-medium">Course Details</div>
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <label className="sm:w-48 font-medium">Course</label>
        <select name="course" value={formData.course} onChange={handleChange} required className="flex-1 p-2 border rounded w-full">
          <option value="">Select course</option>
          <option value="Web Development">Web Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Data Science">Data Science</option>
          <option value="AI / ML">AI / ML</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-medium">How did you hear about us?</label>
        <div className="flex flex-wrap gap-4">
          {["Google", "LinkedIn", "Instagram", "College TPO", "Friend"].map((src) => (
            <label key={src} className="flex items-center space-x-1">
              <input type="radio" name="source" value={src} onChange={handleChange} required checked={formData.source === src} />
              <span>{src}</span>
            </label>
          ))}
        </div>

        {formData.source === "Friend" && (
          <input type="text" name="friendName" value={formData.friendName || ""} onChange={(e) => setFormData((prev) => ({ ...prev, friendName: e.target.value }))} placeholder="Enter your friend's name" className="mt-2 p-2 border rounded w-full" required />
        )}
      </div>
    </div>
  </div>

  {/* Terms & Register */}
  <div className="space-y-4">
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      name="agreed"
      checked={formData.agreed}
      onChange={(e) => {
        if (!formData.agreed) {
          e.preventDefault();
          setShowModal(true);
        } else {
          handleChange(e);
        }
      }}
      className="h-5 w-5"
      required
    />
    <label className="text-sm text-gray-700">
      By clicking submit, you agree to our{" "}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="text-blue-600 font-medium hover:underline"
      >
        Terms & Conditions
      </button>
    </label>
  </div>

  <button
  type="submit"
  disabled={isSubmitting}
  className={`w-full py-3 rounded text-white font-semibold flex items-center justify-center gap-2 ${
    isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  {isSubmitting && (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )}
  <span>{isSubmitting ? "Submitting..." : "Register"}</span>
</button>

</div>

{showModal && (
  <div className="fixed inset-2 z-20 flex items-center justify-center bg-black bg-opacity-30">

    <div className="bg-white rounded-lg w-[90%] max-w-md p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Terms & Conditions</h3>
        <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-black text-xl">
          &times;
        </button>
      </div>
      <div className="text-sm text-gray-800 space-y-2">
        <p><strong>You agree to the following:</strong></p>
        <p>You have understood the course content.</p>
        <p>You have understood the course duration.</p>
        <p>You have cleared all your doubts regarding the course, the content, and the duration.</p>
        <p>Fees once paid is not refundable.</p>
        <p>In case of uninformed leave, you will not be eligible for a backup.</p>
        <p>7 days or more of leave without prior permission will result in termination of registration.</p>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => {
            setFormData((prev) => ({ ...prev, agreed: true }));
            setShowModal(false);
          }}
        >
          I Agree
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


</form>

  );
};

export default Home;