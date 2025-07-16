import React, { useState } from "react";
import axios from "axios"; 
import  {instance}  from "../axiosConfig"; 
import "./Home.css";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
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
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
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

    try {
      const response = await instance.post("/api/details/add", formData);

      alert("Form submitted successfully!");
      console.log("(200) Form submitted:", response.data);

      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
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

          <div className="flex gap-11 items-center">
            <label className="font-medium">Aadhaar Card</label>
            <input type="file" name="aadhaar" onChange={handleChange}  className="bg-gray-500 p-[5px] w-[200px] text-white border-2-black raunded-lg" />
            <input type="file" name="aadhaar2" onChange={handleChange}  className="bg-gray-500 p-[5px] w-[200px] text-white border-2-black raunded-lg" />
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
            }} placeholder="Enter your local address (Where you stay in jaipur)" className="p-2 border rounded" />
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
            <textarea name="permanentAddress" value={formData.permanentAddress}  readOnly onChange={handleChange} disabled={formData.sameAsLocal} placeholder="Enter your permanent address (address of your hometown)" className="p-2 border rounded bg-white disabled:bg-gray-100"/>
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
                  <input type="radio" name="occupation" value={o} onChange={handleChange} checked={formData.occupation === o} required />
                  <span>{o}</span>
                </label>
              ))}
            </div>
          </div>

          {formData.occupation === "Student" && (
            <>
              <div className="flex items-center space-x-4">
                <label className="w-48 font-medium">Last Attained Qualification</label>
                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Enter your qualification" className="flex-1 p-2 border rounded" required />
              </div>
              <div className="flex items-center space-x-4">
                <label className="w-48 font-medium">Year</label>
                <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Enter your completion year" className="flex-1 p-2 border rounded" required />
              </div>
              <div className="flex items-center space-x-4">
                <label className="w-48 font-medium">College / University</label>
                <input type="text" name="college" value={formData.college} onChange={handleChange} placeholder="College / University" className="flex-1 p-2 border rounded" required />
              </div>
            </>
          )}

          {formData.occupation === "Working Professional" && (
            <>
              <div className="flex items-center space-x-4">
                <label className="w-48 font-medium">Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Enter your designation" className="flex-1 p-2 border rounded" required />
              </div>
              <div className="flex items-center space-x-4">
                <label className="w-48 font-medium">Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Enter your company name" className="flex-1 p-2 border rounded" required />
              </div>
            </>
          )}
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
  <div className="flex flex-col gap-2">
    <div className="flex flex-wrap gap-4">
      {["Google", "LinkedIn", "Instagram", "College TPO", "Friend"].map((src) => (
        <label key={src} className="flex items-center space-x-1">
          <input
            type="radio"
            name="source"
            value={src}
            onChange={handleChange}
            required
            checked={formData.source === src}
          />
          <span>{src}</span>
        </label>
      ))}
    </div>

    {/* Show input only when "Friend" is selected */}
    {formData.source === "Friend" && (
      <input
        type="text"
        name="friendName"
        value={formData.friendName || ""}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, friendName: e.target.value }))
        }
        placeholder="Enter your friend's name"
        className="mt-2 p-2 border rounded w-full"
        required
      />
    )}
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