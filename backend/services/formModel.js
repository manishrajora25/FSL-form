import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
  parentName: {
    type: String,
    required: true,
  },
  parentPhone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Parent phone number must be exactly 10 digits'],
  },
  localAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
    enum: ['Student', 'Working Professional'],
  },
  qualification: {
    type: String,
  },
  year: {
    type: String,
  },
  college: {
    type: String,
  },
  designation: {
    type: String,
  },
  company: {
    type: String,
  },
  course: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  friendName: {
    type: String,
  },

  aadhaarFront: {
    type: String, 
    required: true,
  },
  aadhaarBack: {
    type: String, 
    required: true,
  },
  agreed: {
    type: Boolean,
    required: true,
  }
}, {timestamps: true} );

const dataModel= mongoose.model("Form", formSchema);
export default dataModel;