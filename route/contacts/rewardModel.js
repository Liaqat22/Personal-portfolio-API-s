const mongoose = require("mongoose");

const successSchema = new mongoose.Schema(
  {
    
      
    certificate: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
   
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Success", successSchema);