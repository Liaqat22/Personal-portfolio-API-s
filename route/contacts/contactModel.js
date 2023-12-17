const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    
      
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    interview: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contacts", contactSchema);
